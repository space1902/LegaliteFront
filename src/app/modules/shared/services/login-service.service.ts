import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public user = false;

  get User(): boolean{
    return this.user;
  }

  set User(x) {
    this.User = x;
  }

  constructor(private http: HttpClient  ) { }

  getLogin(correo?: any, contraseña?: any): Observable<any | boolean>{
    const endpoint = `${base_url}validarusuario/${correo}/${contraseña}`;

    return this.http.get(endpoint);
  }

}
