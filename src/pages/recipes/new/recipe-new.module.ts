import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeNewPage } from './recipe-new';

@NgModule({
  declarations: [
    RecipeNewPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeNewPage),
  ],
  exports: [
    RecipeNewPage
  ]
})
export class RecipeNewModule {
  
}
