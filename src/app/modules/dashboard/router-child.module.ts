import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from '../perfil/perfil/perfil.component';
import { PqrComponent } from '../pqr/components/pqr/pqr.component';
import { HomeComponent } from './components/home/home.component';


const ChildRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'Pqr', component: PqrComponent },
    { path: 'home', component: HomeComponent }
]

@NgModule({
    imports: [RouterModule.forChild(ChildRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
