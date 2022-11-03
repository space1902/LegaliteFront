import { Component, OnInit } from '@angular/core';
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

  getPqr(){

    this.pqrService.getPqr()
      .subscribe((data:any) => {

        console.log("Respuesta a las Pqr ", data);

      }, (err:any) => {console.log("Error: ", err)})
  }
}
