import { Ingredient } from "./ingredient.model";

export interface Recipe {
    id: number;
    title: string;
    description: string;
    dificulty: number;
    ingredients: Ingredient[]
}