import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrComponent } from '../pqr/components/pqr/pqr.component';
import { HomeComponent } from './components/home/home.component';


const ChildRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'Pqr', component: PqrComponent }
]

@NgModule({
    imports: [RouterModule.forChild(ChildRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
