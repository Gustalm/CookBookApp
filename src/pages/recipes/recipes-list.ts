import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeNewPage } from "./new/recipe-new";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe.model";
import { RecipeDetailPage } from "./detail/recipe-detail";

@IonicPage()
@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html',
})
export class RecipeListPage implements OnInit {
  recipes: Recipe[] = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.observeRecipes.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  onAddClick() {
    this.navCtrl.push(RecipeNewPage);
  }

  onRecipeSelect(recipe: Recipe){
    this.navCtrl.push(RecipeDetailPage, recipe);
  }

}
