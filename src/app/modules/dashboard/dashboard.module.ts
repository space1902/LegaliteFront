import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PqrModule } from '../pqr/pqr.module';
import { PerfilModule } from '../perfil/perfil.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    PqrModule,
    PerfilModule
  ]
})
export class DashboardModule { }
