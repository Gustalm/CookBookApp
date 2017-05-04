import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListPage } from "../shopping-list/shopping-list";
import { RecipeListPage } from "../recipes/recipes-list";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public shoppingListPage = ShoppingListPage;
  public recipesListPage = RecipeListPage;
  
}
