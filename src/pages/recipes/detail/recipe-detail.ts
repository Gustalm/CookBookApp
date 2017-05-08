import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../../models/recipe.model";
import { RecipeNewPage } from "../new/recipe-new";

@IonicPage()
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html',
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    console.log("on init")
    this.recipe = this.navParams.data;
    console.log(this.recipe);
  }

  onEditRecipe(){
    this.navCtrl.push(RecipeNewPage, this.recipe)
  }

  ionViewWillEnter(){
    console.log("will enter")
  }
}
