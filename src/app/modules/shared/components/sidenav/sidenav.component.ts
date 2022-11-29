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

  public answer = localStorage.getItem('key') as string;
  public conver = JSON.parse(this.answer);
  menuNav = [
    {name : "Inicio", route: "Pqr", icon:"home" },
    {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
    {name : "Usuarios", route: "perfiles", icon:"assignment_ind" },
    {name : "Contacto soporte", route: "home", icon:"build" }
  ]
  public dataPqr: PerfilElement[] = [];
  constructor(media: MediaMatcher,
              private PerfilService: PerfilService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px');

  //const answer = localStorage.getItem('key') as string;
  //const conver = JSON.parse(answer);
  console.log("valor del localStorage ");
  console.log(this.conver);
  console.log("Entro en el id ");
  console.log(this.conver.usuarios[0].idUser);
  }


  ngOnInit(): void {
    this.getPerfil();
  }

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


}

export interface PerfilElement{
  idUser: BigInteger;
  nombre: string;
  correo: string;
  direccion: string;
  cargo: BigInteger;
}
