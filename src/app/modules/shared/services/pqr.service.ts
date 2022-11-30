import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  constructor(private http: HttpClient) { }

  getPqr(){
    const endpoint = `${base_url}searchpqr/`;
    return this.http.get(endpoint);
  }

  savePqr(body: any){
    const endpoint = `${base_url}createpqr/`;
    return this.http.post(endpoint, body);
  }

  updatePqr(body: any, id: any) {
    const endpoint = `${base_url}updatepqr/ ${id}`;
    return this.http.put(endpoint, body);
  }

  deletePqr(id: any) {
    const endpoint = `${base_url}deletepqr/ ${id}`;
    return this.http.delete(endpoint);
  }

  searchPqr(id: any) {
    const endpoint = `${base_url}searchpqr/ ${id}`;
    return this.http.get(endpoint);
  }

  searchMyPqr(id: any) {
    const endpoint = `${base_url}searchmypqr/ ${id}`;
    return this.http.get(endpoint);
  }

  check(id: any, body: any){
    const endpoint = `${base_url}updatestado/ ${id}`;
    return this.http.put(endpoint, body);

  }

  Returned(id: any, body: any){
    const endpoint = `${base_url}updatestadodevuelto/ ${id}`;
    return this.http.put(endpoint, body);

  }
}
