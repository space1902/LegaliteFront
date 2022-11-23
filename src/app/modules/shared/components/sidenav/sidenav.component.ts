import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name : "Inicio", route: "Pqr", icon:"home" },
    {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
    {name : "Contacto soporte", route: "home", icon:"build" }
  ]
  public dataPqr: PerfilElement[] = [];
  constructor(media: MediaMatcher,
              private PerfilService: PerfilService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px');
  }


  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){
    this.PerfilService.getPerfil()
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


}

export interface PerfilElement{
  idUser: BigInteger;
  nombre: string;
  correo: string;
  direccion: string;
  cargo: BigInteger;
}
