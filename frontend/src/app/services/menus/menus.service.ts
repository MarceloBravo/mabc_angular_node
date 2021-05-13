import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../constantes/constantes.service';
import { Menu } from '../../class/menus/menu';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private url: string = 'menus';

  constructor(
    private http: HttpClient,
    private constantes: ConstantesService
  ) { }

  getAll(){
    return this.http.get(`${this.constantes.endPoint}${this.url}/get/all`,{headers: this.constantes.header()});
  }

  list(pag: number){
    return this.http.get(`${this.constantes.endPoint}${this.url}/pag/${pag}`,{headers: this.constantes.header()});

  }

  find(id: number){
    return this.http.get(`${this.constantes.endPoint}${this.url}/${id}`,{headers: this.constantes.header()});
  }

  insert(menu: Menu){
    return this.http.post(`${this.constantes.endPoint}${this.url}`, menu,{headers: this.constantes.header()});
  }

  update(id: number, menu: Menu){
    return this.http.put(`${this.constantes.endPoint}${this.url}/${id}`, menu,{headers: this.constantes.header()});
  }

  delete(id: number){
    return this.http.delete(`${this.constantes.endPoint}${this.url}/${id}`,{headers: this.constantes.header()});
  }

  filter(texto: string, pag: number){
    return this.http.get(`${this.constantes.endPoint}${this.url}/filtrar/${texto}/${pag}`,{headers: this.constantes.header()});
  }

  getMenus(rolId: number){
    return this.http.get(`${this.constantes.endPoint}${this.url}/rol/${rolId}`,{headers: this.constantes.header()});
  }
}
