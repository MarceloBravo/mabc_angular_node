import { Component, OnInit } from '@angular/core';
import { Permisos } from 'src/app/class/permisos/permisos';
import { Rol } from 'src/app/class/rol/rol';
import { PermisosService } from '../../../../services/permisos/permisos.service';
import { RolesService } from '../../../../services/roles/roles.service';
import { ToastService } from '../../../../services/toast/toast.service';
/*
IMPORTANTE: Este mantenedor no es un formulario reactivo sino que un formulario enlazado por lo
cual requiere importar "import { FormsModule } from '@angular/forms';" en el archivo app.module.ts
para poder utilizar [(ngModule)] en los archivos html no enlazados
*/

@Component({
  selector: 'app-permisos-form',
  templateUrl: './permisos-form.component.html',
  styleUrls: ['./permisos-form.component.css']
})
export class PermisosFormComponent implements OnInit {
  public showSpinner: boolean = false;
  public messageDialog: string = '';
  public mostrarModal: boolean = false;
  public roles: Rol[] = [];

  public id: any = null;
  public permisos: Permisos[] = [];


  constructor(
    private _permisosService: PermisosService,
    private _rolesService: RolesService,
    private _toastService: ToastService,
    ) {
      this.getRoles();
    }

  ngOnInit(): void {
  }


  private getRoles(){
    this._rolesService.getAll().subscribe(
      (res: any)=>{
        this.roles = res;
      },error=>{
        this.handlerErrors(error);
      }
    )
  }


  buscar(select: HTMLSelectElement){
    this.id = select.value;
    this.showSpinner = true;
    this._permisosService.find(parseInt(select.value)).subscribe(
      (res: any)=>{
        this.permisos = res;
        this.showSpinner = false;
      },error=>{
        this.handlerErrors(error)
      }
    )
  }

  modalGrabar(){
    this.mostrarModal = true;
    this.messageDialog = '¿Desea grabar los permisos?';
  }

  cancelarModal(e: any){
    this.mostrarModal = false;
  }

  aceptarModal(e: any){
    this.mostrarModal = false;
    this.showSpinner = true;
    this._permisosService.save(this.id, this.permisos).subscribe(
      (res: any)=>{
        if(res.tipoMensaje === 'success'){
          this._toastService.showSuccessMessage(res.mensaje);
        }else{
          this._toastService.showErrorMessage(res.mensaje);
        }
        this.showSpinner = false;
      },error=>{
        this.handlerErrors(error);
      }
    )
  }

  private handlerErrors(error: any){
    console.log(error);
    this.showSpinner = false;
    this._toastService.showErrorMessage(error.message);
  }

}
