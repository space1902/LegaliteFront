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

    console.log(data);
    this.estadoForm = "Agregar";


    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      cargo: ['', Validators.required]
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
      cargo: this.perfilForm.get('cargo')?.value
    }
    if(this.data != null) {
      //actualizar
      console.log("edit perfil");
      console.log(this.data.idPerfil);
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
          console.log(data);
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
      nombre: [data.asunto, Validators.required],
      cedula: [data.idCliente, Validators.required],
      correo: [data.cliente, Validators.required],
      direccion: [data.descripcion, Validators.required],
      cargo: [data.descripcion, Validators.required]
    });
  }

}
