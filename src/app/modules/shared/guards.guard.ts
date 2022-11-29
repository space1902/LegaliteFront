import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginServiceService } from './services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  public user = false;

  get User(): boolean{
    return this.user;
  }

  set User(x) {
    this.User = x;
  }

  constructor(private lgSrv: LoginServiceService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{


    return this.lgSrv.User;
  }

}
