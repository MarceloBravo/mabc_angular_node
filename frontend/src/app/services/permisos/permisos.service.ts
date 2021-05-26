import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permisos } from '../../class/permisos/permisos';
import { ConstantesService } from '../constantes/constantes.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private url = "permisos";

  constructor(
    private httpClient: HttpClient,
    private _constantes: ConstantesService
    ) { }

  find(id: number){
    return this.httpClient.get(`${this._constantes.endPoint}${this.url}/${id}`,{headers: this._constantes.header()});
  }

  save(id: number, permisos: Permisos[]){
    let data = {id: id, permisos: permisos};
    permisos.map(p =>
      {
        p.roles_id = id,
        p.acceder = p.acceder?true: false,
        p.crear = p.crear?true: false,
        p.modificar = p.modificar?true: false,
        p.eliminar = p.eliminar?true: false
      }
      );
    //console.log(data, JSON.stringify(data));
    return this.httpClient.post(`${this._constantes.endPoint}${this.url}`,data,{headers: this._constantes.header()});
  }


  getPermisosPantalla(url: string, arrRoles: number[]){
    return this.httpClient.post(`${this._constantes.endPoint}${this.url}/pantalla/${url}`, arrRoles, {headers: this._constantes.header()});
  }

}
