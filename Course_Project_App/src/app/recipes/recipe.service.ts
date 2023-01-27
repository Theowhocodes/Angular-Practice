import { Recipe } from "./recipe.model";

export class RecipeService {

    private recipes: Recipe[] = 
    [
        new Recipe('Spaghetti', 'simple spaghetti', 'https://www.allrecipes.com/thmb/ASRzxoRrPoMLQEpczFvU7osJNF4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21353-italian-spaghetti-sauce-with-meatballs-2x1-141-cedbb650b4264576ab923c91215ce7fc.jpg'),
        new Recipe('Sloppy Joe Pierogies', 'Slop Joes', 'https://www.mrstspierogies.com/wp-content/uploads/2021/03/sloppy-joe.jpg')
    ]; 

    getRecipes(){
        return this.recipes.slice();
    }
}