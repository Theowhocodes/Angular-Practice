import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLogInMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authServ: AuthService, private router: Router){}

    onSwitchMode(){
        this.isLogInMode = !this.isLogInMode;
    }

    onSubmit(form: NgForm){
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLogInMode){
           authObs = this.authServ.login(email, password);
        } else {
            authObs = this.authServ.signup(email, password);
        }

        authObs.subscribe(
            responseData =>{
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );
        
        form.reset();
    }
}