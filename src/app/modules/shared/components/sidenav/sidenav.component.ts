import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private user: any = null;


  public answer = localStorage.getItem('key') as string;
  public conver = JSON.parse(this.answer);


  public menuNav: any;

  public dataPqr: PerfilElement[] = [];
  constructor(media: MediaMatcher,
              private PerfilService: PerfilService,private router: Router, private loginSrv: LoginServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px');

  //const answer = localStorage.getItem('key') as string;
  //const conver = JSON.parse(answer);

      this.user = this.loginSrv.getUserLS();
      this.menuNav = this.user  && (this.user.usuarios[0].cargo === 4 || this.user.usuarios[0].cargo === 1) ?[
      {name : "Inicio", route: "Pqr", icon:"home" },
      {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
      {name : "Usuarios", route: "perfiles", icon:"assignment_ind" },
      {name : "Contacto soporte", route: "home", icon:"build" }
    ] : [{name : "Inicio", route: "Pqr", icon:"home" },
    {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
    {name : "Contacto soporte", route: "home", icon:"build" }];
/*
  if(this.user.usuarios[0].cargo === 4 || this.user.usuarios[0].cargo === 1){
    this.menuNav = [
      {name : "Inicio", route: "Pqr", icon:"home" },
      {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
      {name : "Usuarios", route: "perfiles", icon:"assignment_ind" },
      {name : "Contacto soporte", route: "home", icon:"build" }
    ]
  }
  else{
    this.menuNav = [
      {name : "Inicio", route: "Pqr", icon:"home" },
      {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
      {name : "Usuarios", route: "perfiles", icon:"assignment_ind" },
      {name : "Contacto soporte", route: "home", icon:"build" }
    ]
  }*/
  }


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
        }, (error:any) => {
          console.log("Error: " + error);
        });
  }

  closeSession(){

    if(!localStorage.getItem('key')){
      this.router.navigate(['login']);
      return;
    }

    localStorage.removeItem('key');
    this.router.navigate(['login']);
  }


}

export interface PerfilElement{
  idUser: BigInteger;
  nombre: string;
  correo: string;
  direccion: string;
  cargo: BigInteger;
}
