import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PqrService } from 'src/app/modules/shared/services/pqr.service';

@Component({
  selector: 'app-new-pqr',
  templateUrl: './new-pqr.component.html',
  styleUrls: ['./new-pqr.component.css']
})
export class NewPqrComponent implements OnInit {

  public pqrForm:FormGroup;
  constructor(private fb:FormBuilder, private pqrService: PqrService, private dialogRef: MatDialogRef<NewPqrComponent>) {


    this.pqrForm = this.fb.group({
      asunto: ['', Validators.required],
      idCliente: ['', Validators.required],
      cliente: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
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

    this.pqrService.savePqr(data)
        .subscribe((data: any) => {
          console.log(data);
          this.dialogRef.close(1);
        }, (error) => {
          this.dialogRef.close(2);
        })
  }

  onCancel(){
    this.dialogRef.close(3);
  }

}
