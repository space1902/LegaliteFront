import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginServiceService } from './services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate, CanLoad {

  public user = false;

  get User(): boolean{
    return this.user;
  }

  set User(x) {
    this.User = x;
  }

  constructor(private lgSrv: LoginServiceService){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.lgSrv.User;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{


    return this.lgSrv.User;
  }

}
