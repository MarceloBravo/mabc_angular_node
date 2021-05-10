import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConstantesService } from '../constantes/constantes.service';
import { Rol } from '../../class/rol/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = 'roles'

  constructor(
    private _constantes: ConstantesService,
    private http: HttpClient
    ) { }


  getAll(){
    return this.http.get(`${this._constantes.endPoint}${this.url}/get/all`,{headers: this._constantes.header()});
  }


  list(pag: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/pag/${pag}`,{headers: this._constantes.header()});
  }

  filter(textoBuscado: string, pag: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/filtrar/${textoBuscado}/${pag}`,{headers: this._constantes.header()});
  }

  find(id: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/${id}`,{headers: this._constantes.header()});
  }

  insert(datos: Rol){
    return this.http.post(`${this._constantes.endPoint}${this.url}`, datos, {headers: this._constantes.header()})
  }

  update(id: number, datos: Rol){
    return this.http.put(`${this._constantes.endPoint}${this.url}/${id}`, datos, {headers: this._constantes.header()})
  }

  delete(id: number){
    return this.http.delete(`${this._constantes.endPoint}${this.url}/${id}`, {headers: this._constantes.header()})
 }

}
