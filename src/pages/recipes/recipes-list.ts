import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeNewPage } from "./new/recipe-new";

/**
 * Generated class for the RecipesList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html',
})
export class RecipeListPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onAddClick(){
    this.navCtrl.push(RecipeNewPage);
  }

}
