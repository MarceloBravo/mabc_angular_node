import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../constantes/constantes.service';
import { Customize } from '../../class/customize/customize';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private url: string = 'config'

  constructor(
    private http: HttpClient,
    private _const: ConstantesService
  ) { }

  getData(){
    return this.http.get(`${this._const.endPoint}${this.url}`,{headers: this._const.header()})
  }

  save(data: FormGroup){
    return this.http.post(`${this._const.endPoint}${this.url}`, data, {headers: this._const.header()})
  }
}
