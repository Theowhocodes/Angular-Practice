import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions'

//initial state, should be a js obj to group better
const startingState = {
    ingredients: [
        new Ingredient ('Apples', 5),
        new Ingredient ('Tomatoes', 5),
        new Ingredient ('Garlic', 5),
    ]

};

// function updates the starting state based on the action,
//  for the first time state will be previous state. State changes must be IMMUTABLE
//...(spread operator) pulls out old state properties, copies it and add them to the new one
export function shoppingListReducer(
    state = startingState, 
    action: ShoppingListActions.ShoppingListActions
    ) {
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
        default:
            return state;
    }
}