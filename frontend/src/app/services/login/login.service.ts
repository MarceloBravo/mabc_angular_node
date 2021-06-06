import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { TokenService } from '../token/token.service';
import { FormGroup } from '@angular/forms';
import { ConstantesService } from '../constantes/constantes.service';
import { User } from 'src/app/class/User/user';
import { Rol } from 'src/app/class/rol/rol';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endPoint = 'login';
  private header: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  public usuarioActual$: EventEmitter<User> = new EventEmitter<User>()
  public rolesUsuario$: EventEmitter<Rol[]> = new EventEmitter<Rol[]>()

  constructor(
    private httpClient: HttpClient,
    private _sharedServices: SharedService,
    private _constantes: ConstantesService,
    private _tokenService: TokenService
  ) { }

  login(loginForm: FormGroup){
    //console.log(loginForm.value)
    let remember: boolean = <boolean><unknown>loginForm.value['remember'];
    this._sharedServices.globalRememberUser = remember;
    return this.httpClient.post(this._constantes.endPoint + this.endPoint, loginForm.value, {headers: this.header});
  }

  validaToken(token: string){
    if(token !== ""){
      let tokenArr = token.split('.');
      if(tokenArr.length > 1){
        const decodeToken = JSON.parse(atob(tokenArr[1]));
        return decodeToken.iss === this._constantes.endPoint + this.endPoint
      }
    }
    return false
  }

  registrarToken(token: string, remember: boolean){
    this._tokenService.registerToken(token, remember);
  }

  isLoggedIn(){
    return this._tokenService.getToken() !== null;
  }

  logOut(){
    sessionStorage.removeItem('roles')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('mabc-token')
    //let token: any = this._tokenService.getToken();
    /*return this.httpClient.post(
            `${this._constantes.endPoint}${this.endPoint}/logout`,
            {},
            {headers: this._constantes.header(<string><unknown>token)}
          );
    */
  }

  refreshToken(){
    let token: any = this._tokenService.getToken();
    return this.httpClient.post(
      `${this._constantes.endPoint}${this.endPoint}/refresh`,
      {},
      {headers: this._constantes.header(<string><unknown>token)}
      );
  }

  setUsuarioActual(user: User){
    this.usuarioActual$.emit(user);
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  setRolesUsuario(arrRoles: Rol[]){
    this.rolesUsuario$.emit(arrRoles)
    sessionStorage.setItem('roles', JSON.stringify(arrRoles))
  }

  getUsuarioActual(): User | null{
    let strUser = sessionStorage.getItem('user')
    return strUser ? JSON.parse(strUser) :  null
  }

  getRolesUsuario(): Rol[]{
    let strRoles = sessionStorage.getItem('roles')
    return strRoles ? JSON.parse(strRoles) : []
  }
  private clearCredentials(){

  }
}
