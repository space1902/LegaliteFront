import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PqrService } from 'src/app/modules/shared/services/pqr.service';
import { NewPqrComponent } from '../new-pqr/new-pqr.component';

@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css']
})
export class PqrComponent implements OnInit {

  constructor(private pqrService: PqrService,
             public dialog: MatDialog,
             private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPqr();
  }

  displayedColumns: string[] = ['id', 'asunto', 'cliente', 'nit',  'description', 'cliente', 'actions'];
  dataSource = new MatTableDataSource<PqrElement>();

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
