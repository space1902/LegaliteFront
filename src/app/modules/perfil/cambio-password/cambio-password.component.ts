import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewPqrComponent } from '../../pqr/components/new-pqr/new-pqr.component';
import { PerfilService } from '../../shared/services/perfil.service';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {

  public passwordForm:FormGroup;
  constructor(private dialogRef: MatDialogRef<NewPqrComponent>,
              private fb:FormBuilder,
              private PerfilService: PerfilService ) {

    this.passwordForm = this.fb.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
      nuevacontraseña: ['algo', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  changePassword(){
    let data = {
      correo: this.passwordForm.get('correo')?.value,
      contraseña: this.passwordForm.get('contraseña')?.value,
      nuevacontraseña: this.passwordForm.get('nuevacontraseña')?.value
    }

    console.log(data)

    if(data != null) {
      //actualizar
      this.PerfilService.updatePassword(data, 2)
          .subscribe((data: any) => {
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          })
    }else {
      //error de datos
    console.log("debe haber informacion")
      }
  }
  onCancel(){
    this.dialogRef.close(3);
  }
}
