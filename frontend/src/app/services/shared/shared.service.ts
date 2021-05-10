import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../class/User/user';
import { Rol } from 'src/app/class/rol/rol';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public globalRememberUser: boolean = false;
  public user: User = new User();
  public roles!: Rol[];

  constructor() { }

  getCurrentDate(){
    let date = new Date();
    return `${(date.getDate() < 10 ? '0' : '')}${date.getDate()}/${((date.getMonth() + 1) < 10 ? '0' : '')}${(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  formatDate(fecha: any){
    return fecha.toLocaleString().toString().substr(0,10).split('-').reverse().join('/');
  }


}
