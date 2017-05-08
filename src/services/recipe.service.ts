import { Recipe } from "../models/recipe.model";
import { OnInit, Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { LoadingController } from "ionic-angular";
import { LoadingService } from "./loading.service";

@Injectable()
export class RecipeService implements OnInit {
    recipes: Recipe[] = [];
    observeRecipes = new Subject<Recipe[]>();

    constructor(private loadingService: LoadingService) {

    }

    ngOnInit(): void {
    }

    getRecipes() {
        return this.recipes.slice();
    }

    private emitRecipes() {
        this.observeRecipes.next(this.recipes);
    }

    addRecipe(recipe: Recipe, showLoading: boolean = true) {
        if (showLoading)
            this.loadingService.showLoading("Saving...");

        let observable = new Observable((observer) => {
            setTimeout(() => {
                recipe.id = recipe.id ? recipe.id : Math.round(Math.random() * 9999);
                this.recipes.push(recipe);

                this.emitRecipes();

                observer.next(recipe);
                observer.complete();
                this.loadingService.dismissLoading();
            }, 2000)
        })

        return observable;
    }

    updateRecipe(recipe: Recipe) {
        let recipeIndex = this.recipes.findIndex(item => item.id == recipe.id);

        this.recipes[recipeIndex] = recipe;

        return recipe;
    }

    removeRecipe(recipe: Recipe): boolean {
        let index = this.recipes.indexOf(recipe);
        this.emitRecipes();
        return true;
    }

}