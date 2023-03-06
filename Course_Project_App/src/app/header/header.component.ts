import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { DataStorage } from "../shared/data-storage.service";
import * as fromAppState from '../store/app.reducer';

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
        private authService: AuthService, 
        private store: Store<fromAppState.AppState>
    ){}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(map(authState=>authState.user)).subscribe(user=>{
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