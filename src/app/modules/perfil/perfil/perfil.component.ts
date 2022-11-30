import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PerfilService } from '../../shared/services/perfil.service';
import { CambioPasswordComponent } from '../cambio-password/cambio-password.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  public answer = localStorage.getItem('key') as string;
  public conver = JSON.parse(this.answer);
  public dataPqr: PerfilElement[] = [];
  public perfilForm:FormGroup;
  constructor(private PerfilService: PerfilService,
              private fb:FormBuilder,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {



                this.perfilForm = this.fb.group({
                  nombre: ['', Validators.required],
                  direccion: ['', Validators.required],
                  correo: ['', Validators.required]
                });

   }

  displayedColumns: string[] = ['id', 'nombre', 'email', 'direccion'];
  dataSource = new MatTableDataSource<PerfilElement>();


  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){

    this.PerfilService.getPerfil(this.conver.usuarios[0].idUser)
    .subscribe((data : any)=> {
          let listPerfil = data.usuarioResponse.usuarios;
          listPerfil.forEach((element : PerfilElement) => {
            this.dataPqr.push(element)

          })
          this.perfilForm = this.fb.group({
            nombre: [this.dataPqr[0].nombre, Validators.required],
            direccion: [this.dataPqr[0].direccion, Validators.required],
            correo: [this.dataPqr[0].correo, Validators.required]
          });

        }, (error:any) => {
          console.log("Error: " + error);
        });
  }

  processPerfilResponse(resp: any){

    const dataPerfil: PerfilElement[] = [];

    if(resp.metadata[0].code == "00"){
      let listPerfil = resp.usuarioResponse.usuarios;

      listPerfil.forEach((element: PerfilElement) => {
        dataPerfil.push(element)
      });

      this.dataSource = new MatTableDataSource<PerfilElement>(dataPerfil);
    }
  }

  edit(){
    let data = {
      nombre: this.perfilForm.get('nombre')?.value,
      direccion: this.perfilForm.get('direccion')?.value,
      correo: this.perfilForm.get('correo')?.value
    }

    if(data != null) {
      //actualizar
      this.PerfilService.updatePerfil(data, 2)
          .subscribe((data: any) => {
            //this.dialogRef.close(1);
            alert("Se actualizo la informacion");
          }, (error:any) => {
            //this.dialogRef.close(2);
            alert("No actualizo la informacion se encontraron errores");
          })
    }else {
      //error de datos
      alert("debe haber informacion")
      }
  }
  editPassword(){
    const dialogRef = this.dialog.open(CambioPasswordComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 1){
        this.openSnackBar("Contraseña actualizada", "Exitosa");
        this.getPerfil();
      }else if(result === 2){
        this.openSnackBar("Error al acualizar contraseña", "Fallido");
        this.getPerfil();

      }
    });
  }


  openSnackBar(message:string, action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}

export interface PerfilElement{
  id: string;
  nombre: string;
  correo: string;
  direccion: string;
  cargo: BigInteger;
}
