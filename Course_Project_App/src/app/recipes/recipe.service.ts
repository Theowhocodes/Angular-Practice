import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service"
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>;

    constructor(private slService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe('Spaghetti', 
        'simple spaghetti', 
        'https://www.allrecipes.com/thmb/ASRzxoRrPoMLQEpczFvU7osJNF4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21353-italian-spaghetti-sauce-with-meatballs-2x1-141-cedbb650b4264576ab923c91215ce7fc.jpg', 
        [
            new Ingredient('spaghetti noodle', 1),
            new Ingredient('meat', 1),
            new Ingredient('tomato sauce', 1)
        ]),
        new Recipe('Sloppy Joe Pierogies', 
        'Slop Joes', 
        'https://www.mrstspierogies.com/wp-content/uploads/2021/03/sloppy-joe.jpg', 
        [
            new Ingredient('sloppy mix', 1),
            new Ingredient('pierogie package', 1),
            new Ingredient('buns', 12)
        ])
    ]; 

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngToList(ingredient: Ingredient[]){
        this.slService.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
}