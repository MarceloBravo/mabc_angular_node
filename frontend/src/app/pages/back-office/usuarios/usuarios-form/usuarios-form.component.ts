import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { User } from '../../../../class/User/user';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../../../services/roles/roles.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { Rol } from '../../../../class/rol/rol';
import { CustomValidators } from '../../../../validators/custom-validators';
import { FilesService } from '../../../../services/files/files.service';
import { ConstantesService } from '../../../../services/constantes/constantes.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  public showSpinner: boolean = false;
  public messageDialog: string = '';
  private tipoModal = 'grabar';
  public mostrarModal: boolean = false;
  public url: string = '';
  private usuario: User = new User();
  public roles: Rol[] = [];
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    a_paterno: new FormControl(),
    a_materno: new FormControl(),
    email: new FormControl(),
    direccion: new FormControl(),
    password: new FormControl(),
    confirm_password: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
    deleted_at: new FormControl(),
    roles: new FormControl(),
    foto: new FormControl(),  //Url de la foto
    fotoImage: new FormControl(),
  });
  public id: any = null;
  public srcDefault: string = '/assets/images/users/user.png'
  public fileToUpload: File | undefined;
  public fotoObject: string = ''

  constructor(
    private _userServices: UsuariosService,
    private _files: FilesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _rolesService: RolesService,
    private router: Router,
    private _shared: SharedService,
    private _toastService: ToastService,
    private _const: ConstantesService,
  ) {
    this._toastService.clearToast();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarRoles();
    if(id){
      this.id = parseInt(id);
      this.buscar();
    }else{
      this.iniciarForm();
    }
  }

  ngOnInit(): void {
    this.cargaFotoEnImageControl('','')
  }


  private iniciarForm(){
    this.form = this.fb.group(
      //Validaciones Sincronas
      {
      id: [this.usuario.id,[Validators.min(0)]],
      name: [this.usuario.name,[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      a_paterno: [this.usuario.a_paterno,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      a_materno: [this.usuario.a_materno,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.usuario.email,[Validators.required, Validators.email, Validators.maxLength(150)]],
      direccion: [this.usuario.direccion,[Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      password: [this.usuario.password,[Validators.minLength(6), Validators.maxLength(20)]],
      confirm_password: [this.usuario.confirm_password,[Validators.minLength(6), Validators.maxLength(20)]],
      roles: [this.usuario.roles,[Validators.required]],
      foto: '',
      //fotoObject: this.usuario.fotoObject,
      created_at: this.usuario.created_at,
      updated_at: this.usuario.updated_at,
      deleted_at: this.usuario.deleted_at
    },
    //Validaciones Asincronas
    {
      validators: CustomValidators.confirmPassword('password','confirm_password')
    }
    );
  }


  private buscar(){
    this.showSpinner = true;
    this._userServices.find(this.id).subscribe((res: any)=>{
      if(res['status'] === 'Token is Expired'){
        this.router.navigate(['/']);
      }else{
        console.log('res usuarios',res)
        this.cargarDatos(res);
        this.showSpinner = false;
      }
    },error => {
      this.handlerError(error);
    });
  }


  private cargarDatos(res: any){
    this.usuario = res;
    this.iniciarForm();
    this.cargaFotoEnImageControl('',this.usuario.foto)
  }


  private cargarRoles(){
    this._rolesService.getAll().subscribe((res: any)=>{
      this.roles = res;
    }, error => {
      console.log(error);
    });
  }

  modalGrabar(){
    this.mostrarModal = true;
    this.tipoModal = 'grabar';
    this.messageDialog = '¿Desea grabar el registro';
  }


  modalEliminar(){
    this.mostrarModal = true;
    this.tipoModal = 'eliminar';
    this.messageDialog = '¿Desea eliminar el registro';
  }


  cancelarModal(e: any){
    if(this.tipoModal === 'confirmar cambios'){
      this.router.navigate(['/admin/usuarios'])
    }
    this.mostrarModal = false;
    this.tipoModal = '';
    this.messageDialog = '';
  }

  cancelar(){
    if(this.id !== null && this.detectarCambios()){
      //Se han detectado cambios sin guardar
      this.messageDialog = 'Existen cambios sin guardar. ¿Desea guardar los cambios?';
      this.mostrarModal = true;
      this.tipoModal = 'confirmar cambios';
    }else{
      //No se han detectado cambios, se redirige al listado de roles
      this.router.navigate(['/admin/usuarios']);
    }
  }

  private detectarCambios(){
    //Itera por cada elemento (campo) del objeto form y lo compara con su homonimo pero del objeto
    //usuario (El objeto usuario contiene los datos de la base de dato, el objeto form contiene los
    //cambios del usuario) y retorna un array con los campos con diferencias
    let arrDiferencias = Object.keys(this.form.value).filter(k => k !== 'password' && k !== 'confirm_password' && k !== 'foto').filter((k : string) => this.form.get(k)?.value !== (<any>this.usuario)[k])
    return arrDiferencias.length > 0 || this.fileToUpload !== undefined
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
    console.log(this.id, this.form.value)

    this.form.value.foto = this.fileToUpload?.name
    this.form.value.fotoImage = this.fileToUpload

    this.showSpinner = true;
    this.form.value.updated_at = this._shared.getCurrentDate();
    if(this.id !== null){
      this.actualizar();
    }else{
      this.insertar();
    }

  }


  private insertar(){
    let form = this.createForm();
    this._userServices.insert(form).subscribe((res:any)=> {
      this.handlerSuccess(res);
    },error=>{
      this.handlerError(error);
    });
  }


  private actualizar(){
    let form = this.createForm();
    this._userServices.update(this.id, form).subscribe((res: any)=> {
      this.handlerSuccess(res);
    },error=>{
      this.handlerError(error);
    });
  }


  //genera el objeto FormData que será enviado al backend con datos y archivos adjuntos
  private createForm():FormData{
    let form = new FormData();
    Object.keys(this.form.value).forEach(key => {

      if(key ===  'roles'){
        //Agregar el array con los roles
        this.form.get(key)?.value.forEach(
          (r: any, k: any) => {
            Object.keys(r).forEach(key =>
              form.append(`roles[${k}][${key}]`, r[key])
            )
          }
        )

      }else{
        //Agregando los campos del formulario que no sean un array
        form.append(key, this.form.value[key])
      }
    })

    /*
    //Agrega la foto a subir
    if(this.fileToUpload){
      form.append('fotoImage', this.fileToUpload)
    }
    */
    return form;
  }

  private isSuccess(res: any){
    return (res['status'] !== 'Token is Expired' && !res.errores && res['tipoMensaje'] === "success")
  }


  private eliminar(){
    this.showSpinner = true;

    this._userServices.delete(this.id).subscribe((res: any) => {
      this.handlerSuccess(res);
    },error=>{
      this.handlerError(error);
    });
  }

  comparaRoles(rol1: Rol, rol2: Rol):boolean{
    return rol1 && rol2 ? rol1.id === rol2.id : rol1 === rol2;
  }

  handlerCargarFoto(){
    (<HTMLButtonElement>document.getElementById('btn-file')).click();
  }

  cargarFoto(target: any){
    this.fileToUpload = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //this.form.value.foto = (<File>this.fileToUpload).name;
      //this.usuario.foto = this.form.value.foto  //Actualizando el objeto usuario
      //this.usuario.foto = (<File>this.fileToUpload).name;
      //this.form.value.fotoObject = reader.result// as string;
      this.fotoObject = reader.result as string;
      this.cargaFotoEnImageControl(this.fotoObject)
      console.log(this.form.value)
    }
    reader.readAsDataURL(<File>this.fileToUpload)
  }

  private cargaFotoEnImageControl(object: string = '', url: string = ''){
    let img: HTMLImageElement = <HTMLImageElement>document.getElementById('img-foto')
    img.src = object ? object : url ? this._const.storageImages + 'avatars/' + url : this.srcDefault
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
        this.router.navigate(['/admin/usuarios']);
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
function k(k: any) {
  throw new Error('Function not implemented.');
}

