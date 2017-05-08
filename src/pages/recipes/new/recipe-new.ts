import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Recipe } from "../../../models/recipe.model";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RecipeService } from "../../../services/recipe.service";
import { Ingredient } from "../../../models/ingredient.model";

@IonicPage()
@Component({
    selector: 'page-recipe-new',
    templateUrl: 'recipe-new.html',
})
export class RecipeNewPage {
    recipeForm: FormGroup
    recipeEdit: Recipe;
    flagEdit: boolean;

    constructor(private actionSheetCtrl: ActionSheetController,
        private recipeService: RecipeService,
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController) {
        this.flagEdit = false;
    }

    ngOnInit(): void {
        this.recipeEdit = this.navParams.data;
        this.flagEdit = this.recipeEdit.id != undefined;

        this.recipeForm = this.initializeRecipeForm(this.recipeEdit);
    }

    initializeRecipeForm(recipe: Recipe) {
        return new FormGroup({
            title: new FormControl(recipe.title ? recipe.title : '', Validators.required),
            description: new FormControl(recipe.description ? recipe.description : '', Validators.required),
            dificulty: new FormControl(recipe.dificulty ? recipe.dificulty : '1', Validators.required),
            ingredients: new FormArray(this.createIngredientFormGroups(recipe.ingredients))
        })
    }

    createIngredientFormGroups(ingredients: Ingredient[]) {
        let formGroups: FormGroup[] = [];

        if (ingredients)
            for (let i = 0; i <= ingredients.length - 1; i++) {
                formGroups.push(this.createIngredientFormGroup(ingredients[i]))
            }

        return formGroups;
    }

    createIngredientFormGroup(ingredient) {
        return new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, Validators.required)
        })
    }

    private getIngredientsControl() {
        return <FormArray>this.recipeForm.controls['ingredients'];
    }

    addIngredientsControl() {
        let ingredientsControl = this.getIngredientsControl();

        let alert = this.alertCtrl.create({
            title: 'Add Ingredient',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Ingredient'
                },
                {
                    name: 'amount',
                    placeholder: 'Amount',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        return;
                    }
                },
                {
                    text: 'Add',
                    handler: (data) => {
                        let ingredient: Ingredient = {
                            id: null,
                            name: data.name,
                            amount: data.amount
                        };

                        ingredientsControl.push(this.createIngredientFormGroup(ingredient));
                    }
                }
            ]
        });
        alert.present();
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
                        return;
                    }
                }
            ]
        })

        actionSheet.present();
    }

    onSubmit() {
        let recipe: Recipe = this.recipeForm.value;
        if (!this.flagEdit)
            this.recipeService.addRecipe(recipe).subscribe((recipe: Recipe) => {
                this.navCtrl.pop();
            });
        else {
            recipe.id = this.recipeEdit.id;
            this.recipeService.updateRecipe(recipe);
        }
    }
}
