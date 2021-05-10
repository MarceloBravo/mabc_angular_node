import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pantalla } from '../../class/pantalla/pantalla';
import { ConstantesService } from '../constantes/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class PantallasService {
  private url: string = 'pantallas';

  constructor(
    private http: HttpClient,
    private _constantes: ConstantesService
  ) { }

  list(pag: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/pag/${pag}`,{headers: this._constantes.header()});
  }

  filter(texto: string, pag: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/filtrar/${texto}/${pag}`,{headers: this._constantes.header()});
  }

  find(id: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/${id}`,{headers: this._constantes.header()});
  }

  insert(pantalla: Pantalla){
    return this.http.post(`${this._constantes.endPoint}${this.url}`,pantalla,{headers: this._constantes.header()});
  }

  update(id: number, pantalla: Pantalla){
    return this.http.put(`${this._constantes.endPoint}${this.url}/${id}`,pantalla,{headers: this._constantes.header()});
  }

  delete(id: number){
    return this.http.delete(`${this._constantes.endPoint}${this.url}/${id}`,{headers: this._constantes.header()});
  }
}
