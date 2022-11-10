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
    {name : "Inicio", route: "Pqr", icon:"home" },
    {name : "Mi perfil", route: "home", icon:"supervisor_account" },
    //{name : "Crear Pqr", route: "perfil", icon:"assignment" },
    {name : "Contacto soporte", route: "soporte", icon:"build" }
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px');
  }

  ngOnInit(): void {
  }

}
