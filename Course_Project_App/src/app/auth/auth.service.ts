import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { User } from "./user.model";

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
    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI78rbykLoxaxm4990ApVuU6DNyrKZWRQ',
        {
            email: email ,
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

    login(password: string, email: string){
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

    private handleUserAuthentication(
        email: string,
        userId: string, 
        token: string, 
        expiresIn: number,
        ){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User ( email, userId, token, expirationDate);
        this.user.next(user);
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