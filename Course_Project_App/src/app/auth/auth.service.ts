import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAppState from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: number;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromAppState.AppState>){}

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI78rbykLoxaxm4990ApVuU6DNyrKZWRQ',
        {
            email: email,
            password: password,
            returnSecureToken: true

        } 
        ).pipe(
            catchError(this.handleError), 
            tap(responseData => {
                this.handleUserAuthentication(
                    responseData.email, 
                    responseData.localId,
                    responseData.idToken, 
                    +responseData.expiresIn, 
                    )}
                    ) 
             );
    }

    login(email: string, password: string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI78rbykLoxaxm4990ApVuU6DNyrKZWRQ',
        {
            email: email,
            password: password,
            returnSecureToken: true

        }
        ).pipe(catchError(this.handleError), tap(responseData => {
            this.handleUserAuthentication(
                responseData.email, 
                responseData.localId,
                responseData.idToken, 
                +responseData.expiresIn, 
                )}
                ));
    }

    autoLogin(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        }  = JSON.parse(localStorage.getItem('userData'));
        if (!userData){
            return;
        } 

        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token ){
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.Login({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token, 
                expirationDate: new Date(userData._tokenExpirationDate)
            }))
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        // this.user.next(null);
        this.store.dispatch(new AuthActions.Logout())
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenTimer){
            clearTimeout(this.tokenTimer);
        }
        this.tokenTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        } , expirationDuration);
    }

    private handleUserAuthentication(
        email: string,
        userId: string, 
        token: string, 
        expiresIn: number,
        ){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User ( email, userId, token, expirationDate);
        // this.user.next(user);
        this.store.dispatch(new AuthActions.Login({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate
        })
        );

        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'Unknown error occurred';
            if (!errorResponse.error || !errorResponse.error.error ){
                return throwError(errorMessage)
            }
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists in our database!';
                    break;
                case 'EMAIL_NOT_FOUND': 
                    errorMessage = 'Something happened... email and/or password maybe invalid!';
                    break;  
                case 'INVALID_PASSWORD':
                    errorMessage = 'Something happened... email and/or password maybe invalid!';
                    break;
            }
            return throwError(errorMessage);
        
    }
}