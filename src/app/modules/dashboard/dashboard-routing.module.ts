import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../shared/components/login/login.component';
import { GuardsGuard } from '../shared/guards.guard';
import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
},
        {
            path: 'dashboard',
            component: DashboardComponent,
            loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule),
            canActivate: [GuardsGuard],
            canLoad: [GuardsGuard]
        },
        {path: '**',  redirectTo: '/login'},
        {
          path: ' ',
          redirectTo: '/login'
      }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
