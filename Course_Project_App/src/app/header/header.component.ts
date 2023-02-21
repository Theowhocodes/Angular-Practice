import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorage } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(
        private dataStorage: DataStorage, 
        private authService: AuthService
    ){}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !user ? false : true;
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData(){
        this.dataStorage.storeRecipes();
    }

    onFetchData(){
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogOut(){
        this.authService.logout();
    }
}