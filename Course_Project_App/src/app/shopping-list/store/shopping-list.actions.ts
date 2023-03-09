import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
 
 
export const addIngredient = createAction(
  '[Shopping List] Add Ingredient',
  props<{
    ingredient: Ingredient
  }>()
);
 
 
export const addIngredients = createAction(
  '[Shopping List] Add Ingredients',
  props<{
    ingredients: Ingredient[]
  }>()
);
 
 
export const updateIngredient = createAction(
  '[Shopping List] Update Ingredient',
  props<{
    ingredient: Ingredient
  }>()
);
 
 
export const deleteIngredient = createAction(
  '[Shopping List] Delete Ingredient'
);
 
 
export const startEdit = createAction(
  '[Shopping List] Start Edit',
  props<{
    index: number
  }>()
);
 
 
export const stopEdit = createAction(
  '[Shopping List] Stop Edit'
);




// import { Action } from "@ngrx/store";
// import { Ingredient } from "src/app/shared/ingredient.model";

// //OBJECT THAT DEFINES UNIQUE IDENTIFIERS
// //storing the string identifier here allows us to just import it so we can rule out typos
// export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
// export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
// export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
// export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
// export const START_EDIT = '[Shopping List] Start Edit';
// export const STOP_EDIT = '[Shopping List] Stop Edit';


// export class AddIngredient implements Action {
//     readonly type = ADD_INGREDIENT;

//     constructor(public payload: Ingredient){}
// }

// export class AddIngredients implements Action {
//     readonly type = ADD_INGREDIENTS;

//     constructor(public payload: Ingredient[]){}
// }

// export class UpdateIngredient implements Action {
//     readonly type = UPDATE_INGREDIENT;

//     constructor(public payload: Ingredient){}
// }

// export class DeleteIngredient implements Action {
//     readonly type = DELETE_INGREDIENT;
// }

// export class StartEdit implements Action {
//     readonly type = START_EDIT;

//     constructor(public payload: number){}
// }

// export class StopEdit implements Action {
//     readonly type = STOP_EDIT;
// }

// //creates a union of all shoppinglist actions I want to support in my store
// export type ShoppingListActions = 
// AddIngredient | 
// AddIngredients | 
// UpdateIngredient | 
// DeleteIngredient |
// StartEdit |
// StopEdit;