import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipes.component";

const routes: Routes = [
{
    path: 'recipes', component: RecipeComponent, 
    canActivate: [AuthGuard],
        children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent },
        {path: ':id', component: RecipeDetailComponent },
        {path: ':id/edit', component: RecipeEditComponent },        
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class RecipesRoutingModule {}