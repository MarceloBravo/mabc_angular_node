import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../../../../class/rol/rol';
import { RolesService } from '../../../../services/roles/roles.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { SharedService } from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  public rol: Rol = new Rol();
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
  });
  public id: any = null;
  public url: string = '';
  public mostrarModal: boolean = false;
  public messageDialog: string = '¿Desea grabar el registro?';
  public showSpinner: boolean = false;
  private tipoModal: string = 'grabar';

  constructor(
    private _rolesService: RolesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _toastService: ToastService,
    private _shared: SharedService,
  ) {
    this._toastService.clearToast();
    const urlTree = this.router.url.split('?')[0];
    this.url = urlTree

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID',id);
    if(id != undefined){
      this.id = id
      this.buscarRol();
    }else{
      this.buildForm()
    }
  }

  ngOnInit(): void {
  }


  private buildForm(){
    this.form = this.fb.group({
      id: [this.rol.id],
      name: [this.rol.name,[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: [this.rol.description, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      created_at: [this.rol.created_at],
      updated_at: [this.rol.updated_at],
      deleted_at: [this.rol.deleted_at],
    })
  }


  private buscarRol(){
    this.showSpinner = true
    this._rolesService.find(this.id).subscribe(
      (res: any) => {
        if(res['status'] === 'Token is Expired'){
          this.router.navigate(['/']);
        }else{
          this.rol = res
          this.buildForm()
          console.log(this.rol)
          this.showSpinner = false
        }
      }, error => {
        this.handlerError(error);
      }
    )
  }

  modalGrabar(){
    this.mostrarModal = true;
    this.messageDialog = '¿Desea grabar el registro?';
    this.tipoModal = 'grabar';
  }

  modalEliminar(){
    this.mostrarModal = true;
    this.messageDialog = '¿Desea eliminar el registro?';
    this.tipoModal = 'eliminar';
  }


  cancelar(){
    if(this.id !== null && this.detectarCambios()){
      //Se han detectado cambios sin guardar
      this.messageDialog = 'Existen cambios sin guardar. ¿Desea guardar los cambios?';
      this.tipoModal = 'confirmar cambios';
      this.mostrarModal = true;
    }else{
      //No se han detectado cambios, se redirige al listado de roles
      this.router.navigate(['/admin/roles']);
    }
  }

  private detectarCambios(){
    let arrDiferencias =  Object.keys(this.form.value).filter(k => this.form.get(k)?.value !==  (<any>this.rol)[k]);
    return arrDiferencias.length > 0;
  }


  cancelarModal(e: any){
    this.mostrarModal = false;
    if(this.tipoModal === 'confirmar cambios'){
      this.router.navigate(['/admin/roles'])
    }
    this.messageDialog = '';
    this.tipoModal = '';
  }

  aceptarModal(e: any){
    if(this.tipoModal === 'grabar' || this.tipoModal === 'confirmar cambios'){
      this.grabar();
    }else{
      this.eliminar();
    }
    this.cancelarModal(null);
  }



  private grabar(){
    this.showSpinner = true
    this.form.value['updated_at'] = this._shared.getCurrentDate();
    if(this.id !== null){
      this.actualizar();
    }else{
      this.form.value['created_at'] = this._shared.getCurrentDate();
      this.insertar();
    }
  }

  private insertar(){
    this._rolesService.insert(this.form.value).subscribe(
      (res: any)=>{

        this.handlerSuccess(res);
      },error=>{
        this.handlerError(error);
      }
    );
  }

  private actualizar(){
    this._rolesService.update(this.id, this.form.value).subscribe(
      (res: any)=>{
        this.handlerSuccess(res);
      },error=>{
        this.handlerError(error);
      }
    );
  }


  private eliminar(){
    this.showSpinner = true
    this._rolesService.delete(this.id).subscribe(
      (res: any)=>{
        this.handlerSuccess(res);
      },error=>{
        this.handlerError(error);
      }
    );
  }

  private handlerSuccess(res: any){
    if(res['status'] === 'Token is Expired'){
      this.router.navigate(['/']);
    }else{
      if(res.errores){
        let mensaje: string = res.mensaje;
        mensaje += ': ' + Object.keys(res.errores).map(k => res.errores[k]).join(',');
        this._toastService.showErrorMessage(mensaje);
      }else if(res['tipoMensaje'] === "success"){
        this._toastService.showSuccessMessage(res['mensaje']);
        this.router.navigate(['/admin/roles']);
      }
      this.showSpinner = false
    }
  }

  private handlerError(error: any){
    this._toastService.showErrorMessage(error.message);
    console.log(error);
    this.showSpinner = false
  }
}
