import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilService } from '../../shared/services/perfil.service';

@Component({
  selector: 'app-new-perfil',
  templateUrl: './new-perfil.component.html',
  styleUrls: ['./new-perfil.component.css']
})
export class NewPerfilComponent implements OnInit {

  public perfilForm:FormGroup;
  public estadoForm: String = "";
  constructor(private fb:FormBuilder,
              private perfilservice:PerfilService,
              private dialogRef: MatDialogRef<NewPerfilComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoForm = "Agregar";


    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      cargo: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(data != null) {
      this.updateForm(data)
      this.estadoForm = "Actualizar";
    }
   }

  ngOnInit(): void {
  }

  onSave(){
    let data = {
      nombre: this.perfilForm.get('nombre')?.value,
      nit: this.perfilForm.get('cedula')?.value,
      correo: this.perfilForm.get('correo')?.value,
      direccion: this.perfilForm.get('direccion')?.value,
      cargo: this.perfilForm.get('cargo')?.value,
      password: this.perfilForm.get('password')?.value
    }

    if(this.data != null) {
      //actualizar
      this.perfilservice.updatePerfil(data, this.data.idUser)
          .subscribe((data: any) => {
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          })
    }else {
      //crear nueva pqr
    this.perfilservice.savePerfil(data)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error) => {
          this.dialogRef.close(2);
        })
      }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.perfilForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      cedula: [data.nit, Validators.required],
      correo: [data.correo, Validators.required],
      direccion: [data.direccion, Validators.required],
      cargo: [data.cargo, Validators.required],
      password: [data.password, Validators.required]
    });
  }

}
