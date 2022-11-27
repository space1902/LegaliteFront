import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { PerfilService } from '../../shared/services/perfil.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  public dataPerfiles: PerfilesElement[] = [];
  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private PerfilService: PerfilService) { }

  ngOnInit(): void {
    this.getPerfiles();
    this.getPerfil();
  }

  displayedColumns: string[] = ['idUser', 'nombre', 'nit', 'correo',  'direccion', 'cargo', 'actions'];
  dataSource = new MatTableDataSource<PerfilesElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  getPerfil(){
    this.PerfilService.getPerfil()
    .subscribe((data : any)=> {
          console.log(data);
          let listPerfil = data.usuarioResponse.usuarios;
          listPerfil.forEach((element : PerfilesElement) => {
            this.dataPerfiles.push(element)

          })
          console.log("prueba")
          console.log(this.dataPerfiles[0].nombre)
          console.log(this.dataPerfiles[0].idUser)
          console.log(this.dataPerfiles[0].cargo)

          /*this.perfilForm = this.fb.group({
            nombre: [dataPqr[0].nombre, Validators.required],
            direccion: [dataPqr[0].direccion, Validators.required],
            correo: [dataPqr[0].correo, Validators.required]
          });*/

        }, (error:any) => {
          console.log("Error: " + error);
        });
  }

  getPerfiles(){

    this.PerfilService.getPerfiles()
      .subscribe((data:any) => {

        console.log("Respuesta a los perfiles ", data);
        this.processPqrResponse(data);

      }, (err:any) => {console.log("Error: ", err)})
  }

  processPqrResponse(resp: any){

    const dataPerfiles: PerfilesElement[] = [];

    if(resp.metadata[0].code == "00"){
      let listPerfiles = resp.usuarioResponse.usuarios;

      listPerfiles.forEach((element: PerfilesElement) => {
        dataPerfiles.push(element)
      });

      this.dataSource = new MatTableDataSource<PerfilesElement>(dataPerfiles);
      this.dataSource.paginator = this.paginator;
    }
  }
  /*openPqrDialog(){
    const dialogRef = this.dialog.open(NewPqrComponent , {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 1){
        this.openSnackBar("Pqr agregada", "Exitosa");
        this.getPqr();
      }else if(result === 2){
        this.openSnackBar("Error al agregar Pqr", "Fallido");
        this.getPqr();

      }
    });
  }*/

  edit(idUser: number, nombre: string , nit: number, correo: string, direccion: string, cargo:number){
    /*const dialogRef = this.dialog.open(NewPqrComponent , {
      width: '650px',
      data: {idUser: idUser, nombre: nombre, nit: nit, correo: correo, direccion: direccion, cargo: cargo}
    });*/

    /*dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 1){
        this.openSnackBar("Pqr actualizada", "Exitosa");
        //this.getPqr();
      }else if(result === 2){
        this.openSnackBar("Error al acualizar Pqr", "Fallido");
        //this.getPqr();

      }
    });*/
  }

  delete(idUser: number){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px',
      data: {idUser: idUser,id: 2}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 1){
        this.openSnackBar("usuario eliminada", "Exitosa");
        this.getPerfiles();
      }else if(result === 2){
        this.openSnackBar("Error al eliminar usuario", "Fallido");
        this.getPerfiles();

      }
    });
  }

  buscar(termio: any){
    console.log("entro en perfiles")
    if(termio.length === 0){
      console.log("entro al 0")
      return this.getPerfiles();
    }
    this.PerfilService.getPerfil2(termio)
        .subscribe((resp: any) => {
          this.processPqrResponse(resp);
        })
  }

  buscarcargo(termio: any){
    console.log("entro en cargo")
    if(termio.length === 0){
      console.log("entro al 0")
      return this.getPerfiles();
    }
    this.PerfilService.getcargo(termio)
        .subscribe((resp: any) => {
          this.processPqrResponse(resp);
        })
  }

  openSnackBar(message:string, action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}


export interface PerfilesElement{
  idUser: string;
  nombre: string;
  nit: BigInteger;
  correo: string;
  direccion: string;
  cargo: BigInteger;
}

