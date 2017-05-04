import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ActionSheetController, NavController } from "ionic-angular";
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";

@Component({
    selector: 'app-new-recipe',
    templateUrl: './new-recipe.component.html',
})

export class NewRecipeComponent implements OnInit {
    recipeForm: FormGroup

    constructor(private actionSheetCtrl: ActionSheetController,
        private recipeService: RecipeService,
        private navCtrl: NavController) {

    }

    ngOnInit(): void {
        this.recipeForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            dificulty: new FormControl(1, Validators.required),
            ingredients: new FormArray([
            ])
        })
    }

    initIngredientForm() {
        return new FormGroup({
            name: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required)
        });
    }

    private getIngredientsControl() {
        return <FormArray>this.recipeForm.controls['ingredients'];
    }

    addIngredientsControl() {
        let ingredientsControl = this.getIngredientsControl();
        ingredientsControl.push(this.initIngredientForm());
    }

    removeAllIngredients() {
        let ingredientsControl = this.getIngredientsControl();
        ingredientsControl.reset();
    }

    onManageIngredient() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Ingredients',
            buttons: [
                {
                    text: 'Add Ingredient',
                    handler: () => {
                        this.addIngredientsControl();
                        return;
                    }
                },
                {
                    text: 'Remove All Ingredients',
                    handler: () => {
                        this.removeAllIngredients();
                        return;
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        this.removeAllIngredients();
                        return;
                    }
                }
            ]
        })

        actionSheet.present();
    }

    onSubmit() {
        let recipe: Recipe = this.recipeForm.value;
        this.recipeService.addRecipe(recipe).subscribe((recipe: Recipe) => {
            this.navCtrl.pop();
        });
    }
}
