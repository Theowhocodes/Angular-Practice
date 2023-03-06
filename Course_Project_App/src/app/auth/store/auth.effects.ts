import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from '../../../../../environments/environment';

import * as AuthActions from '../store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: number;
    localId: string;
    registered?: boolean;
}

//gives you an observable that gives access to all dispatched actions to react 
//to but differently than the reducer; Not changing state
@Injectable()
export class AuthEffects {
    //@Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart)=>{
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI78rbykLoxaxm4990ApVuU6DNyrKZWRQ',
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
    
            } 
            )
        })
    )

//first action handler/effect
// @Effect()
    authLogin = this.actions$.pipe(

        //defines a filter of what types of effects you want to handle
        ofType(AuthActions.LOGIN_START),

        //allows us to take an observables data and create a new one
        switchMap((authData: AuthActions.LoginStart) =>{
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI78rbykLoxaxm4990ApVuU6DNyrKZWRQ',
        {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true

        }
        ).pipe(catchError(error =>{
            return of();
        }), map(responseData =>{
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
            return new AuthActions.AuthenticateSuccess({
                email: responseData.email,
                userId: responseData.localId,
                token: responseData.idToken,
                expirationDate: expirationDate
            });
        })); 
        }),

    );

    // @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS), 
        tap(()=>{
        this.router.navigate(['/']);
    })
    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private router: Router){}
}