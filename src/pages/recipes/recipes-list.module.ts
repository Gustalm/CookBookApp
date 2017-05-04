import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeListPage } from './recipes-list';

@NgModule({
  declarations: [
    RecipeListPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeListPage),
  ],
  exports: [
    RecipeListPage
  ]
})

export class RecipesListModule {}
