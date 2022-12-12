import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrComponent } from './components/pqr/pqr.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPqrComponent } from './components/new-pqr/new-pqr.component';
import { NewPqrAscComponent } from './components/new-pqr-asc/new-pqr-asc.component';



@NgModule({
  declarations: [
    PqrComponent,
    NewPqrComponent,
    NewPqrAscComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PqrModule { }
