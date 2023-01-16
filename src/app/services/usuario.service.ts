import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuariosAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:3000/usuarios');
  }

  getUsuarioById(id:number): Observable<Usuario>{
    //ou usar template string
    return this.http.get<Usuario>('http://localhost:3000/usuarios/'+id);
  }

  addUsuario(newUsuario: Usuario) {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=uft-8');

    //JSON STRINGIFY NO CASO DO JSON SERVER
    return this.http.post('http://localhost:3000/usuarios',JSON.stringify(newUsuario),{headers:headers});
  }

  updateUsuario(updateUsuario: Usuario) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=uft-8');

    //JSON STRINGIFY NO CASO DO JSON SERVER
    return this.http.put('http://localhost:3000/usuarios/'+updateUsuario.id,JSON.stringify(updateUsuario),{headers:headers});
  }

  deleteUsuarioById(id:number) {
    return this.http.delete('http://localhost:3000/usuarios/' + id);
  }
}
