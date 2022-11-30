import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilService } from '../../services/perfil.service';
import { PqrService } from '../../services/pqr.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private PqrService: PqrService,
              private PerfilService: PerfilService) { }

  ngOnInit(): void {
  }

  onNonCLick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data.id == 1){
      if(this.data != null) {
        this.PqrService.deletePqr(this.data.idPqr)
            .subscribe((data: any) => {
              this.dialogRef.close(1);
            }, (error) =>{
              this.dialogRef.close(2);
            })
      }else{
        this.dialogRef.close(2);
      }
    }
    if(this.data.id == 2){
      if(this.data != null) {
        this.PerfilService.deletePerfil(this.data.idUser)
            .subscribe((data: any) => {
              this.dialogRef.close(1);
            }, (error) =>{
              this.dialogRef.close(2);
            })
      }else{
        this.dialogRef.close(2);
      }
    }
  }

}
