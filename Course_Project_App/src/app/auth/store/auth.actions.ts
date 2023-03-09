import { createAction, props, Action } from "@ngrx/store";

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{
      email: string;
      password: string
    }>()
);
   
   
  export const signupStart = createAction(
    '[Auth] Signup Start',
    props<{
      email: string;
      password: string
    }>()
  );
   
   
  export const authenticateSuccess = createAction(
    '[Auth] Authenticate Success',
    props<{
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean
    }>()
  );
   
   
  export const authenticateFail = createAction(
    '[Auth] Authenticate Fail',
    props<{
      errorMessage: string
    }>()
  );
   
   
  export const clearError = createAction(
    '[Auth] Clear Error'
  );
   
   
  export const autoLogin = createAction(
    '[Auth] Auto Login'
  );
   
   
  export const logout = createAction(
    '[Auth] Logout'
  );





// export const LOGIN_START = '[Auth] Login Start';
// export const AUTHENTICATE_SUCCESS = '[Auth] Login';
// export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
// export const SIGNUP_START = '[Auth] Signup Start';
// export const LOGOUT = '[Auth] Logout';

// export class AuthenticateSuccess implements Action{
//     readonly type = AUTHENTICATE_SUCCESS;

//     constructor(
//         public payload: {
//             email:string; 
//             userId:string; 
//             token:string;  
//             expirationDate: Date;
//         }
//     ){}
// }

// export class Logout implements Action{
//     readonly type = LOGOUT;
// }

// export class LoginStart implements Action{
//     readonly type = LOGIN_START;

//     constructor(public payload: {email: string, password: string}){}
// }

// export class AuthenticateFail implements Action{
//     readonly type = AUTHENTICATE_FAIL;

//     constructor(public payload: string){}
// }

// export class SignupStart implements Action{
//     readonly type = SIGNUP_START;

//     constructor(public payload: {email: string, password: string}){}

// }

// //union type to unite all actions under one type
// export type AuthActions = 
// AuthenticateSuccess | 
// Logout | 
// AuthenticateFail | 
// LoginStart | 
// SignupStart;