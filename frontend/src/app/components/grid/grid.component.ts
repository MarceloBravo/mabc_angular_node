import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { PermisosService } from '../../services/permisos/permisos.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: [
    './grid.component.css',
    '../../../assets/css/app.css',
  ]
})
export class GridComponent implements OnInit {
  @Input() registros: any[] = []
  @Input() cabeceras: Object[] = []
  @Input() columnasVisibles: string[] = []
  @Input() titulo: string = ''
  @Input() urlEditar: string = 'edit';
  @Input() urlNuevo: string = 'nuevo';
  @Output() idEliminar: EventEmitter<number> = new EventEmitter();
  @Output() textoFiltro: EventEmitter<string> = new EventEmitter();
  public mostrarNuevo: boolean = false;
  public mostrarEditar: boolean = false;
  public mostrarEliminar: boolean = false;

  constructor(
    private _permisos: PermisosService,
    private _login: LoginService,
    private router: Router
  ) {
    this.aplicarPermisos()
  }

  ngOnInit(): void {
  }

  private aplicarPermisos(){
    let url = this.router.url.split('/')[2]
    let roles = this._login.getRolesUsuario()
    this._permisos.getPermisosPantalla(url, roles.map(r => r.id)).subscribe((res: any) => {
      res.forEach((p: any) => {
        if(p.crear)this.mostrarNuevo = true
        if(p.modificar)this.mostrarEditar = true
        if(p.eliminar)this.mostrarEliminar = true
      })
    },error=>{
      console.log(error)
    })
  }

  eliminar(id: number){
    this.idEliminar.emit(id);
  }

  textoFiltroChange(texto: string){
    this.textoFiltro.emit(texto);
  }

  formatDate(dato: any){
    let parseDate = Date.parse(dato);
    if(isNaN(dato) && !isNaN(parseDate)){
      //Retorna la fecha con formato dd/mm/yyyy
      return dato.toLocaleString().toString().substr(0,10).split('-').reverse().join('/');
    }else{
      //Retorna el dato recibido
      return dato;
    }
  }

  getColNames(obj: object){
    let arrKeyNames = Object.keys(obj);
    if(arrKeyNames.indexOf('id') !== undefined){
      arrKeyNames.splice(arrKeyNames.indexOf('id'),1);
    }
    return arrKeyNames;
  }

}
