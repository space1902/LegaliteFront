import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrService } from 'src/app/modules/shared/services/pqr.service';

@Component({
  selector: 'app-new-pqr',
  templateUrl: './new-pqr.component.html',
  styleUrls: ['./new-pqr.component.css']
})
export class NewPqrComponent implements OnInit {

  public pqrForm:FormGroup;
  public estadoForm: String = "";
  constructor(private fb:FormBuilder,
              private pqrService: PqrService,
              private dialogRef: MatDialogRef<NewPqrComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoForm = "Agregar";


    this.pqrForm = this.fb.group({
      asunto: ['', Validators.required],
      idCliente: ['', Validators.required],
      cliente: ['', Validators.required],
      descripcion: ['', Validators.required]
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
      asunto: this.pqrForm.get('asunto')?.value,
      idCliente: this.pqrForm.get('idCliente')?.value,
      cliente: this.pqrForm.get('cliente')?.value,
      descripcion: this.pqrForm.get('descripcion')?.value
    }
    if(this.data != null) {
      //actualizar
      this.pqrService.updatePqr(data, this.data.idPqr)
          .subscribe((data: any) => {
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          })
    }else {
      //crear nueva pqr
    this.pqrService.savePqr(data)
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
    this.pqrForm = this.fb.group({
      asunto: [data.asunto, Validators.required],
      idCliente: [data.idCliente, Validators.required],
      cliente: [data.cliente, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });
  }

}
