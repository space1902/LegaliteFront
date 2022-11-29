import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { PerfilService } from 'src/app/modules/shared/services/perfil.service';
import { PqrService } from 'src/app/modules/shared/services/pqr.service';
import { NewPqrComponent } from '../new-pqr/new-pqr.component';

@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css']
})
export class PqrComponent implements OnInit {

  public answer = localStorage.getItem('key') as string;
  public conver = JSON.parse(this.answer);
  public dataPqr: PerfilElement[] = [];
  constructor(private pqrService: PqrService,
             public dialog: MatDialog,
             private snackBar: MatSnackBar,
             private PerfilService: PerfilService) { }

  ngOnInit(): void {
    this.getPqr();
    this.getPerfil();
  }

  displayedColumns: string[] = ['id', 'asunto', 'cliente', 'nit',  'description', 'actions'];
  dataSource = new MatTableDataSource<PqrElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  getPerfil(){
    console.log(this.conver.usuarios[0].idUser);
    this.PerfilService.getPerfil(this.conver.usuarios[0].idUser)
    .subscribe((data : any)=> {
          console.log(data);
          let listPerfil = data.usuarioResponse.usuarios;
          listPerfil.forEach((element : PerfilElement) => {
            this.dataPqr.push(element)

          })
          console.log("prueba")
          console.log(this.dataPqr[0].nombre)
          console.log(this.dataPqr[0].idUser)
          console.log(this.dataPqr[0].cargo)

          /*this.perfilForm = this.fb.group({
            nombre: [dataPqr[0].nombre, Validators.required],
            direccion: [dataPqr[0].direccion, Validators.required],
            correo: [dataPqr[0].correo, Validators.required]
          });*/

        }, (error:any) => {
          console.log("Error: " + error);
        });
  }

  getPqr(){

    this.pqrService.getPqr()
      .subscribe((data:any) => {

        console.log("Respuesta a las Pqr ", data);
        this.processPqrResponse(data);

      }, (err:any) => {console.log("Error: ", err)})
  }

  processPqrResponse(resp: any){

    const dataPqr: PqrElement[] = [];

    if(resp.metadata[0].code == "00"){
      let listPqr = resp.pqrResponse.pqrs;

      listPqr.forEach((element: PqrElement) => {
        dataPqr.push(element)
      });

      this.dataSource = new MatTableDataSource<PqrElement>(dataPqr);
      this.dataSource.paginator = this.paginator;
    }
  }
  openPqrDialog(){
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
  }

  edit(idPqr: number, asunto: string, descripcion: string, cliente:number){
    const dialogRef = this.dialog.open(NewPqrComponent , {
      width: '650px',
      data: {idPqr: idPqr, asunto: asunto, descripcion: descripcion, cliente: cliente}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 1){
        this.openSnackBar("Pqr actualizada", "Exitosa");
        this.getPqr();
      }else if(result === 2){
        this.openSnackBar("Error al acualizar Pqr", "Fallido");
        this.getPqr();

      }
    });
  }

  delete(idPqr: number){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px',
      data: {idPqr: idPqr,id: 1}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 1){
        this.openSnackBar("Pqr eliminada", "Exitosa");
        this.getPqr();
      }else if(result === 2){
        this.openSnackBar("Error al eliminar Pqr", "Fallido");
        this.getPqr();

      }
    });
  }

  buscar(termio: any){
    if(termio.length === 0){
      return this.getPqr();
    }
    this.pqrService.searchPqr(termio)
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

export interface PqrElement{
  description: string;
  id: number;
  name: string;

}


export interface PerfilElement{
  idUser: string;
  nombre: string;
  correo: string;
  direccion: string;
  cargo: BigInteger;
}
