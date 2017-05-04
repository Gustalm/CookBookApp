import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from "../pages/tabs/tabs";
import { RecipeNewPage } from "../pages/recipes/new/recipe-new";
import { RecipeListPage } from "../pages/recipes/recipes-list";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { NewRecipeComponent } from "../components/recipe/new/new-recipe.component";
import { RecipeService } from "../services/recipe.service";
import { LoadingService } from "../services/loading.service";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipeNewPage,
    RecipeListPage,
    ShoppingListPage,
    NewRecipeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RecipeNewPage,
    RecipeListPage,
    ShoppingListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RecipeService,
    LoadingService
  ]
})
export class AppModule { }
