import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from '../perfil/perfil/perfil.component';
import { PerfilesComponent } from '../perfil/perfiles/perfiles.component';
import { PqrComponent } from '../pqr/components/pqr/pqr.component';
import { HomeComponent } from './components/home/home.component';


const ChildRoutes: Routes = [
    { path: '', component: PqrComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'Pqr', component: PqrComponent },
    { path: 'home', component: HomeComponent },
    { path: 'perfiles', component: PerfilesComponent }
]

@NgModule({
    imports: [RouterModule.forChild(ChildRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
