import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import * as fromAppState from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    isLogInMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private authServ: AuthService, 
        private router: Router,
        private store: Store<fromAppState.AppState>
    ){}


    ngOnInit() {
        this.store.select('auth').subscribe(authState =>{
            this.isLoading = authState.loading;
            this.error = authState.authError;
        })        
    }

    

    onSwitchMode(){
        this.isLogInMode = !this.isLogInMode;
    }

    onSubmit(form: NgForm){
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLogInMode){
        //    authObs = this.authServ.login(email, password);
        this.store.dispatch(
            AuthActions.loginStart({
                email: email,
                password: password
            })
        )
        } else {
            authObs = this.authServ.signup(email, password);
        }



        // authObs.subscribe(
        //     responseData =>{
        //         console.log(responseData);
        //         this.isLoading = false;
        //         this.router.navigate(['/recipes']);
        //     },
        //     errorMessage => {
        //         console.log(errorMessage);
        //         this.error = errorMessage;
        //         this.isLoading = false;
        //     }
        // );
        
        form.reset();
    }
}