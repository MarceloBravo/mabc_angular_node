import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private _sharedService: SharedService
  ) { }

  registerToken(token: string, remember: boolean){
    this._sharedService.globalRememberUser = remember;
    if(remember){
      localStorage.setItem('mabc-token', token);
    }else{
      sessionStorage.setItem('mabc-token', token);
    }
  }

  getToken(){
    if(this._sharedService.globalRememberUser){
      return localStorage.getItem('mabc-token');
    }else{
      return sessionStorage.getItem('mabc-token');
    }
  }

  deteToken(){
    if(this._sharedService.globalRememberUser){
      localStorage.removeItem('mabc-token');
    }else{
      sessionStorage.removeItem('mabc-token');
    }
  }
}
