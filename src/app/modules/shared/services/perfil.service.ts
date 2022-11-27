import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient  ) { }

  getPerfil(){

    const endpoint = `${base_url}searchuser/2`;
    return this.http.get(endpoint);

  }
  getPerfil2(id: any){

    const endpoint = `${base_url}searchuser/ ${id}`;
    return this.http.get(endpoint);

  }

  updatePerfil(body: any, id: any){

    const endpoint = `${base_url}updatemyuser/ ${id}`;
    return this.http.put(endpoint, body);

  }

  updatePassword(body: any, id: any){

    const endpoint = `${base_url}updatemypassword/ ${id}`;
    return this.http.put(endpoint, body);

  }
  getPerfiles(){

    const endpoint = `${base_url}searchusers/`;
    return this.http.get(endpoint);

  }

  getcargo(id: any){

    const endpoint = `${base_url}searchcargo/ ${id}`;
    return this.http.get(endpoint);

  }


  deletePerfil(id: any) {
    const endpoint = `${base_url}deleteuser/ ${id}`;
    return this.http.delete(endpoint);
  }
}
