import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'recipes', 
    loadChildren: ()=> import('./recipes/recipes.module').then(module => module.RecipesModules)}

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}