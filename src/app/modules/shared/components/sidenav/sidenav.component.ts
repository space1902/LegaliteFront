import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name : "Inicio", route: "home", icon:"home" },
    {name : "Mi perfil", route: "perfil", icon:"supervisor_account" },
    {name : "Crear solicitud", route: "solicitud", icon:"assignment" },
    {name : "Contacto soporte", route: "soporte", icon:"build" }
  ]

  constructor(media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px');
  }

  ngOnInit(): void {
  }

}
