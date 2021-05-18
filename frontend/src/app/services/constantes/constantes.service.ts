import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {
  public endPoint = "http://localhost:3000/"  //Ruta de las peticiones al backend
  public storageImages = "http://localhost:3000/images/" //Ruta de almnacenamiento de las imágenes en el backend

  constructor(private _tokenService: TokenService) { }

  //Cabecera para las peticiones estándar (GET, POST, PUT, DELETE)
  public header(token: string = ''){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ? token : this._tokenService.getToken()}`
    });
  }


  //Cabecera de las peticiones para los envíos de imágenes
  public headerAttachFile(){
    return new HttpHeaders({
      'Authorization': `Bearer ${this._tokenService.getToken()}`
    });
  }

}
