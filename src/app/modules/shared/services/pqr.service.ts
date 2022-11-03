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
}
