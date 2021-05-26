import { Component, OnInit } from '@angular/core';
import { Paginacion } from '../../../../class/paginacion/paginacion';
import { Menu } from '../../../../class/menus/menu';
import { MenusService } from '../../../../services/menus/menus.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menus-grid',
  templateUrl: './menus-grid.component.html',
  styleUrls: ['./menus-grid.component.css']
})
export class MenusGridComponent implements OnInit {
  public showSpinner: boolean = false;
  public mostrarModalEliminar: boolean = false;
  public headers: string[] = ['Nombre','Url','Posición','Fecha creación','Fecha Actualización'];
  public visibleColumns: string[] = ['nombre','url','posicion','created_at','updated_at'];
  public menus: Menu[] = [];
  public paginacion: Paginacion = new Paginacion();
  private idEliminar: any = null;

  constructor(
    private _menusService: MenusService,
    private _toastService: ToastService,
    private router: Router,
  ) {
    this.obtenerDatos();
  }

  ngOnInit(): void {
  }

  private obtenerDatos(){
    this.showSpinner = true;
    console.log('Página',this.paginacion.pagina)
    this._menusService.list(this.paginacion.pagina).subscribe(
      (res: any)=>{
        if(res['status'] === 'Token is Expired'){
          this.router.navigate(['/']);
        }else{
          this.cargarDatos(res);
          this.showSpinner = false;
        }
    },error=>{
      this.handlerError(error);
    })
  }

  private cargarDatos(res: any){
    this.menus = res.data;
    this.paginacion.pagina = res.page;
    this.paginacion.registrosPorPagina = res.rowsPerPage;
    this.paginacion.totRegistros = res.rows;
    this.paginacion.totPaginas = Math.ceil(res.rows / res.rowsPerPage);
    this.paginacion.arrPaginas = Array.from({length: this.paginacion.totPaginas},(k ,v)=> v + 1);
  }

  cancelarEliminar(e: any){
    this.idEliminar = null;
    this.mostrarModalEliminar = false;
  }

  aceptarEliminar(e: any){
    this.showSpinner = true;
    this._menusService.delete(this.idEliminar).subscribe(
      (res: any)=>{
        this._toastService.showSuccessMessage(res.mensaje, res.tipoMensaje);
        this.obtenerDatos();
        this.mostrarModalEliminar = false;
    },error=>{
      this.handlerError(error);
    })

  }

  eliminar(id: number){
    this.mostrarModalEliminar = true;
    this.idEliminar = id;
  }

  mostrarPagina(pag: number){
    this.paginacion.pagina = pag;
    this.obtenerDatos();
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
    this._menusService.filter(texto, this.paginacion.pagina).subscribe(
      (res: any)=>{
        this.cargarDatos(res);
        this.showSpinner = false;
      },error=>{
        this.handlerError(error);
      }
    )
  }

  private handlerError(error: any){
    console.log(error);
    this.showSpinner = false;
    this._toastService.showErrorMessage(error.message);
  }

}
