import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Menu } from '../../../../class/menus/menu';
import { MenusService } from '../../../../services/menus/menus.service';
import { RolesService } from '../../../../services/roles/roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PantallasService } from '../../../../services/pantallas/pantallas.service';
import { Pantalla } from '../../../../class/pantalla/pantalla';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-pantallas-form',
  templateUrl: './pantallas-form.component.html',
  styleUrls: ['./pantallas-form.component.css']
})
export class PantallasFormComponent implements OnInit {
  public showSpinner: boolean = false;
  public messageDialog: string = '';
  public mostrarModal: boolean = false;
  private pantalla: Pantalla = new Pantalla();
  private tipoModal: string = 'grabar';
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    menus_id: new FormControl(),
    permite_crear: new FormControl(),
    permite_modificar: new FormControl(),
    permite_eliminar: new  FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
  });
  public menus: Menu[] = [];
  public id: any = null

  constructor(
    private _pantallasService: PantallasService,
    private _menusService: MenusService,
    private _toast: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarMenus();
    if(id !== null){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.initForm();
    }
  }

  ngOnInit(): void {
  }

  private initForm(){
    this.form = this.fb.group({
      id: [this.pantalla.id,[Validators.min(0)]],
      nombre: [this.pantalla.nombre,[Validators.required, Validators.min(3), Validators.max(50)]],
      menus_id: [this.pantalla.menus_id, [Validators.required]],
      permite_crear: [this.pantalla.permite_crear,[Validators.required]],
      permite_modificar: [this.pantalla.permite_modificar,[Validators.required]],
      permite_eliminar: [this.pantalla.permite_eliminar,[Validators.required]],
      created_at: this.pantalla.created_at,
      updated_at: this.pantalla.updated_at,
      deleted_at: this.pantalla.deleted_at,
    })
  }

  private cargarMenus(){
    this.showSpinner = true;
    this._menusService.getAll().subscribe(
      (res: any)=>{
        this.menus = res;
        this.showSpinner = false;
      },error=>{
        this.handlerError(error);
      }
    )
  }

  private buscar(){
    this.showSpinner = true;
    this._pantallasService.find(this.id).subscribe(
      (res: any)=> {
        if(res['status'] === 'Token is Expired'){
          this.router.navigate(['/']);
        }else{
          this.pantalla = res;
          this.initForm();
          this.showSpinner = false;
        }
      }, error => {
        this.handlerError(error);
      }
    )
  }

  modalGrabar(){
    this.mostrarModal = true;
    this.tipoModal = 'grabar';
    this.messageDialog = '¿Desea grabar el registro?';
  }

  modalEliminar(){
    this.mostrarModal = true;
    this.tipoModal = 'eliminar';
    this.messageDialog = '¿Desea eliminar el registro?';
  }

  cancelarModal(e: any){
    if(this.tipoModal === 'confirmar cambios'){
      this.router.navigate(['/admin/pantallas'])
    }
    this.mostrarModal = false;
    this.messageDialog = '';
    this.tipoModal = '';
  }

  aceptarModal(e: any){
    if(this.tipoModal === 'grabar' || this.tipoModal === 'confirmar cambios'){
      this.grabar()
    }else{
      this.eliminar();
    }
    this.cancelarModal(null);
  }

  private grabar(){
    this.showSpinner = true;
    if(this.id !== null){
      this.actualizar();
    }else{
      this.insertar();
    }
  }

  private insertar(){
    this._pantallasService.insert(this.form.value).subscribe(
      (res: any)=>{
        this.handlerSuccess(res);

      }, error=>{
        this.handlerError(error);
      }
    )
  }

  private actualizar(){
    this._pantallasService.update(this.id, this.form.value).subscribe(
      (res: any)=>{
        this.handlerSuccess(res);

      }, error=>{
        this.handlerError(error);
      }
    )
  }

  private eliminar(){
    this._pantallasService.delete(this.id).subscribe(
      (res: any)=>{
        this.handlerSuccess(res);

      }, error=>{
        this.handlerError(error);
      }
    )
  }

  cancelar(){
    delete this.pantalla.url
    delete this.pantalla.menu

    if(this.detectarCambios()){
      this.mostrarModal = true
      this.messageDialog = "¿Desea grabar los cambios?";
      this.tipoModal = 'confirmar cambios';
    }else{
      this.router.navigate(['/admin/pantallas']);
    }
  }

  private detectarCambios(){
    let arrDiferencias = Object.keys(this.form.value).filter(k => this.form.get(k)?.value !== (<any>this.pantalla)[k]);
    return arrDiferencias.length > 0;

  }

  private handlerSuccess(res: any){
    console.log(res);
    if(res['status'] === 'Token is Expired'){
      this.router.navigate(['/']);
    }else{
      if(res.tipoMensaje === 'success'){
        this._toast.showSuccessMessage(res.mensaje);
      }else{
        this._toast.showErrorMessage(res.mensaje);
      }
      this.showSpinner = false;
      this.router.navigate(['/admin/pantallas'])
      this.cancelarModal(null);
    }
  }

  private handlerError(error: any){
    console.log(error);
    this.showSpinner = false;
    this._toast.showErrorMessage(error.message);
  }

}
