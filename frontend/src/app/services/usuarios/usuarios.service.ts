import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../constantes/constantes.service';
import { User } from 'src/app/class/User/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string = 'usuarios';
  private url_servidor_imagenes: string = ''
  public avatarActualizado$: EventEmitter<String> = new EventEmitter<String>()

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

  insert(user: FormData){
    return this.http.post(`${this._constantes.endPoint}${this.url}`, user, {headers: this._constantes.header()});
  }

  update(id: number, user: FormData){
    let foto = user.get('foto')
    let fotoImage = user.get('fotoImage')
    if(foto && fotoImage)this.avatarActualizado$.emit(<String>foto)
    return this.http.put<object>(`${this._constantes.endPoint}${this.url}/${id}`, user, {headers: this._constantes.headerAttachFile()});
  }

  delete(id: number){
    return this.http.delete(`${this._constantes.endPoint}${this.url}/${id}`, {headers: this._constantes.header()});
  }

}
