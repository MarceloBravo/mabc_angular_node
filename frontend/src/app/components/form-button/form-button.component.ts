import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PermisosService } from '../../services/permisos/permisos.service';
import { Router } from '@angular/router';
import { User } from 'src/app/class/User/user';
import { LoginService } from '../../services/login/login.service';
import { Rol } from 'src/app/class/rol/rol';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.css']
})
export class FormButtonComponent implements OnInit {
  @Input() formInvalid: boolean = false
  @Input() id: number | null = null
  @Output() cancelar$: EventEmitter<any> = new EventEmitter<boolean>()
  @Output() eliminar$: EventEmitter<any> = new EventEmitter<boolean>()
  @Output() grabar$: EventEmitter<any> = new EventEmitter<boolean>()
  public mostrarGrabar: boolean = false
  public mostrarEliminar: boolean = false

  constructor(
    private _permisosService: PermisosService,
    private _login: LoginService,
    private router: Router
  ) {
    this.aplicarPermisos()
  }

  ngOnInit(): void {
    console.log('form-button component')
    this._login.usuarioActual$.subscribe((res: User) => {
      console.log('usuario actual en form-button component',res);
    })
  }

  private aplicarPermisos(){
    let url = this.router.url.split('/')[2];
    let arrRoles: Rol[] = this._login.getRolesUsuario();
    this._permisosService.getPermisosPantalla(url, arrRoles.map(r => r.id)).subscribe((res: any) => {
      res.forEach((p: any) => {
        if(p.crear || (p.modificar && this.id))this.mostrarGrabar = true
        if(p.eliminar)this.mostrarEliminar = true
      })
    },error => {
      console.log(error)
    })
  }

  cancelar(){
    return this.cancelar$.emit(true)
  }

  modalEliminar(){
    return this.eliminar$.emit(true)
  }

  modalGrabar(){
    return this.grabar$.emit(true)
  }

}
