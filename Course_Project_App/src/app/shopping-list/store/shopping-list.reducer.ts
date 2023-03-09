import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
 
 
export interface State {
  ingredients: Ingredient[];
  editIndex: number;
}
 
 
const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editIndex: -1
};
 
 
const _shoppingListReducer = createReducer(
 
  initialState,
 
  on(
    ShoppingListActions.addIngredient,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })
  ),
 
  on(
    ShoppingListActions.addIngredients,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })
  ),
 
  on(
    ShoppingListActions.updateIngredient,
    (state, action) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.map(
        (ingredient, index) => index === state.editIndex ? { ...action.ingredient } : ingredient
      )
    })
  ),
 
  on(
    ShoppingListActions.deleteIngredient,
    (state) => ({
      ...state,
      editIndex: -1,
      ingredients: state.ingredients.filter(
        (_, index) => index !== state.editIndex
      )
    })
  ),
 
  on(
    ShoppingListActions.startEdit,
    (state, action) => ({
      ...state, editIndex:
      action.index
    })
  ),
 
  on(
    ShoppingListActions.stopEdit,
    (state) => ({
      ...state, editIndex: -1
    })
  )
 
);
 
 
export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}


// import { Ingredient } from "../../shared/ingredient.model";
// import * as ShoppingListActions from './shopping-list.actions'

// export interface State {
//     ingredients: Ingredient[], 
//     editedIngredient: Ingredient,
//     editedIngredientIndex: number;
// }

// //initial state, should be a js obj to group better
// const startingState: State = {
//     ingredients: [
//         new Ingredient ('Apples', 5),
//         new Ingredient ('Tomatoes', 5),
//         new Ingredient ('Garlic', 5),
//     ],
//     editedIngredient: null,
//     editedIngredientIndex: -1

// };

// //NGRX WILL AUTO PASS CURRENT STATE AND ACTION AND EXECUTE THIS FUNCTION


// // function updates the starting state based on the action,
// //  for the first time state will be previous state. State changes must be IMMUTABLE
// //...(spread operator) pulls out old state properties, copies it and add them to the new one
// //always copy the state to make sure to keep items not being edited as well!!!
// export function shoppingListReducer(
//     state: State = startingState, 
//     action: ShoppingListActions.ShoppingListActions
//     ) {

// // USE SWITCH CASES TO CHECK THE ACTION TYPE AND RETURN A NEW STATE DEPENDING ON THE TYPE
// //DATA IN <- DATA OUT -> RETURN STATE WILL BE REGISTERED AS THE shoppingList: slice of the overall appstate

// switch(action.type){
//         case ShoppingListActions.ADD_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, action.payload]
//             };
//         case ShoppingListActions.ADD_INGREDIENTS:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, ...action.payload]
//             };

//             //will copy old ingredients and overwrite them with the new data 
//         case ShoppingListActions.UPDATE_INGREDIENT:
//             const ingredient = state.ingredients[state.editedIngredientIndex];
//             const updatedIngredient = {
//                 ...ingredient,
//                 ...action.payload
//             };
//             //replaces old element in array with updated copy ingredients
//             const updatedIngredients = [...state.ingredients];
//             updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            
//             return {
//                 ...state,
//                 ingredients: updatedIngredients,
//                 editedIngredientIndex: -1, 
//                 editedIngredient: null
//             };
//         case ShoppingListActions.DELETE_INGREDIENT:

//             return {
//                 ...state,
//                 ingredients: state.ingredients.filter((ingredient, ingredientIndex) =>{
//                     return ingredientIndex !== state.editedIngredientIndex;
//                 }), //will filter through an array and if return true, element will be apart of new array
//                 editedIngredientIndex: -1,
//                 editedIngredient: null
//             };
//             //sets edited ingredient index to payloads index and same with the corresponding ingredient
//         case ShoppingListActions.START_EDIT:
//             return {
//                 ...state,
//                 editedIngredientIndex: action.payload,
//                 editedIngredient: {...state.ingredients[action.payload] }
//             };
//         case ShoppingListActions.STOP_EDIT:
//             return {
//                 ...state,
//                 editedIngredient: null,
//                 editedIngredientIndex: -1
//             }
//         default:
//             return state;
//     }
// }