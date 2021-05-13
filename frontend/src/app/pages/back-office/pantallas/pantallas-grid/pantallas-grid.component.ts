import { Component, OnInit } from '@angular/core';
import { Pantalla } from 'src/app/class/pantalla/pantalla';
import { Paginacion } from '../../../../class/paginacion/paginacion';
import { PantallasService } from '../../../../services/pantallas/pantallas.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantallas-grid',
  templateUrl: './pantallas-grid.component.html',
  styleUrls: ['./pantallas-grid.component.css']
})
export class PantallasGridComponent implements OnInit {
  public showSpinner: boolean = false;
  public mostrarModalEliminar: boolean = false;
  public gridHeaders: string[] = ['Nombre','Menú','Url','Fecha creación','Fecha actualización','Acciones'];
  public visibleColumns: string[] = ['nombre','menu','url','created_at','updated_at'];
  public data: Pantalla[] = [];
  public paginacion: Paginacion  = new Paginacion();
  private idEliminar: any = null;

  constructor(
    private _pantallasServices: PantallasService,
    private _toast: ToastService,
    private router: Router,
  ) {
    this.obtenerDatos();
  }

  ngOnInit(): void {
  }

  private obtenerDatos(){
    this.showSpinner = true;
    this._pantallasServices.list(this.paginacion.pagina).subscribe(
      (res: any)=>{
        if(res['status'] === 'Token is Expired'){
          this.router.navigate(['/']);
        }else{
          this.cargarDatos(res);
        }
      },error=>{
        this.handlerError(error);
      }
    )
  }

  private cargarDatos(res: any){
    this.data = res.data;
    this.paginacion.pagina = res.page;
    this.paginacion.registrosPorPagina = res.rowsPerPage;
    this.paginacion.totRegistros = res.rows;
    this.paginacion.totPaginas = Math.ceil( res.rows / res.rowsPerPage );
    this.paginacion.arrPaginas = Array.from({length: this.paginacion.totPaginas},(k ,v)=> v + 1);
    this.showSpinner = false;
  }


  cancelarEliminar(e: any){
    this.mostrarModalEliminar = false;
    this.idEliminar = null;
  }

  aceptarEliminar(e: any){
    this.showSpinner = true;
    this.mostrarModalEliminar = false;
    this._pantallasServices.delete(this.idEliminar).subscribe(
      (res: any) => {
        if(res.tipoMensaje === 'success'){
          this._toast.showSuccessMessage(res.mensaje)
        }else{
          this._toast.showErrorMessage(res.mensaje);
        }
        this.obtenerDatos();
      },error => {
        this.handlerError(error);
      }
    )
  }

  eliminar(id: any){
    this.idEliminar = id;
    this.mostrarModalEliminar = true;
  }

  filtrar(texto: string){
    if(texto === ''){
      this.obtenerDatos();
    }else{
      this.paginacion.pagina = 0;
      this._pantallasServices.filter(texto, this.paginacion.pagina).subscribe(
        (res: any)=> {
          this.cargarDatos(res);
        },error=>{
          this.handlerError(error);
        }
      )
    }
  }

  mostrarPagina(pagina: number){
    this.paginacion.pagina = pagina;
    this.obtenerDatos();
  }


  private handlerError(error: any){
    console.log(error);
    this.showSpinner = false;
    this._toast.showErrorMessage(error.message)
  }
}
