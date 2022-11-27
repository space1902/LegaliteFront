import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';
import { PerfilesComponent } from './perfiles/perfiles.component';



@NgModule({
  declarations: [
    PerfilComponent,
    CambioPasswordComponent,
    PerfilesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PerfilModule { }
