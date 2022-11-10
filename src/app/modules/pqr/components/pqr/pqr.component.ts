import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PqrService } from 'src/app/modules/shared/services/pqr.service';

@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrls: ['./pqr.component.css']
})
export class PqrComponent implements OnInit {

  constructor(private pqrService: PqrService) { }

  ngOnInit(): void {
    this.getPqr();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'cliente', 'actions'];
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
}

export interface PqrElement{
  description: string;
  id: number;
  name: string;

}
