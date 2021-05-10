import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../constantes/constantes.service';
import { User } from 'src/app/class/User/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string = 'usuarios';
  private url_servidor_imagenes: string = ''

  constructor(
    private http: HttpClient,
    private _constantes: ConstantesService,
  ) { }

  getAll(){
    return this.http.get(`${this._constantes.endPoint}${this.url}/get/all`,{headers: this._constantes.header()});
  }

  list(page: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/pag/${page}`,{headers: this._constantes.header()});
  }

  filter(buscado: string, page: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/filtrar/${buscado}/${page}`,{headers: this._constantes.header()});
  }

  find(id: number){
    return this.http.get(`${this._constantes.endPoint}${this.url}/${id}`,{headers: this._constantes.header()});
  }

  insert(user: User){
    return this.http.post(`${this._constantes.endPoint}${this.url}`, user, {headers: this._constantes.header()});
  }

  update(id: number, user: User){
    /*
    debugger
    let form = new FormData()
    if(user.foto && user.fotoObject){
      form.append(user.foto, user.fotoObject)
    }

    let data = new Blob([JSON.stringify(user)],
    {
        type: "application/json"
    })
    form.append('data', JSON.stringify(user));

    (Object.keys(user) as (keyof User)[]).forEach(k => {
      console.log(k, user[k])
      if(k !== 'foto' && 'fotoObject'){
        form.append(k, <string>user[k])
      }
    })
    console.log(id, user, JSON.stringify(user))
    */
    return this.http.put<object>(`${this._constantes.endPoint}${this.url}/${id}`, user, {headers: this._constantes.headerAttachFile()});
  }

  delete(id: number){
    return this.http.delete(`${this._constantes.endPoint}${this.url}/${id}`, {headers: this._constantes.header()});
  }

}
