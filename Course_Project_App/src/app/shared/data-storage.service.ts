import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()//allows us to inject other services into it
export class DataStorage  {
    constructor( private http: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-ngcourse-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        this.http.get<Recipe []>('https://recipe-book-ngcourse-default-rtdb.firebaseio.com/recipes.json').subscribe(
            recipes =>{
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}