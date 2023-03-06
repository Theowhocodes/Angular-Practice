import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

//This reducer merges all of my other reducers together
//AppState defines the global application state
export interface AppState{
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

//new constant reducers (ActionReducer)brings together all the slices into the appstate
export const appReducer: ActionReducerMap<AppState> ={
    shoppingList: fromShoppingList.shoppingListReducer, 
    auth: fromAuth.authReducer
};