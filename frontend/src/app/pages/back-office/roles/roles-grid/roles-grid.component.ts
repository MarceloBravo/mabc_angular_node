import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../../services/roles/roles.service';
import { Paginacion } from '../../../../class/paginacion/paginacion';
import { Rol } from '../../../../class/rol/rol';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-grid',
  templateUrl: './roles-grid.component.html',
  styleUrls: [
    './roles-grid.component.css',
    '../../../../../assets/css/app.css',
  ]
})
export class RolesGridComponent implements OnInit {
  public paginacion: Paginacion = new Paginacion();
  public roles: Rol[] = [];
  public mostrarModalEliminar: boolean = false;
  private idDelete: number = 0;
  public showSpinner: boolean = false;

  constructor(
    private _rolesService: RolesService,
    private _toastService: ToastService,
    private router: Router,
  ) {
    this.obtenerDatos();
  }

  ngOnInit(): void {
    this._toastService.showPendingToast();
  }

  private obtenerDatos(){
    this.showSpinner = true
    this._rolesService.list(this.paginacion.pagina).subscribe((res: any) => {
      if(res['status'] === 'Token is Expired'){
        this.router.navigate(['/']);
      }else{
        this.cargarDatos(res)
        this.showSpinner = false
      }
    }, error => {
      this.showSpinner = false
      this._toastService.showErrorMessage(error.status !== 401 ? error.message : 'Usuario y/o contraseña no validos', 'Error!!')
      console.log('error',error)
    })
  }

  private cargarDatos(res: any){
    this.roles = res.data
    this.paginacion.registrosPorPagina = res.rowsPerPage
    this.paginacion.totRegistros = res.rows
    this.paginacion.totPaginas = Math.ceil(res.rows / res.rowsPerPage)
    this.paginacion.arrPaginas = Array.from({length: this.paginacion.totPaginas},(k ,v)=> v + 1);
  }



  public formatDate(fecha: any){
    return fecha.toLocaleString().toString().substr(0,10).split('-').reverse().join('/')
  }

  mostrarPagina(pag: number){
    this.paginacion.pagina = pag
    this.obtenerDatos()
  }

  eliminar(id: number){
    this.idDelete = id;
    this.mostrarModalEliminar = true;
  }

  aceptarEliminar(e: any){
    this.mostrarModalEliminar = false;
    this.showSpinner = true
    this._rolesService.delete(this.idDelete).subscribe(
      (res: any)=>{
        if(res['tipoMensaje'] === "success"){
          this._toastService.showSuccessMessage(res['mensage']);
          this.obtenerDatos();
        }
        this.showSpinner = false
      },error=>{
        this._toastService.showErrorMessage(error.message);
        console.log(error);
        this.showSpinner = false
      }
    );
  }

  cancelarEliminar(e: any){
    this.mostrarModalEliminar = e;
  }

  filtrar(texto: string){
    this.paginacion.pagina = 0;
    if(texto  === ""){
      this.obtenerDatos();
    }else{
      this.filtrarDatos(texto);
    }
  }

   private filtrarDatos(texto: string){
    this.showSpinner = true;
    this._rolesService.filter(texto, this.paginacion.pagina).subscribe(
      (res: any)=>{
        this.cargarDatos(res);
        this.showSpinner = false;
      },error=>{
        console.log(error);
        this.showSpinner = false;
        this._toastService.showErrorMessage(error.message);
      }
    )
  }

}
