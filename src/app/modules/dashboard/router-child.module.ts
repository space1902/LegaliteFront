import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const ChildRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
]

@NgModule({
    imports: [RouterModule.forChild(ChildRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
