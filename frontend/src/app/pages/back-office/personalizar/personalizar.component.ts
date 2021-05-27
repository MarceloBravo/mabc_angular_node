import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Customize } from '../../../class/customize/customize';
import { CustomizeService } from '../../../services/customize/customize.service';
import { ToastService } from '../../../services/toast/toast.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-personalizar',
  templateUrl: './personalizar.component.html',
  styleUrls: ['./personalizar.component.css']
})
export class PersonalizarComponent implements OnInit {
  public showSpinner: boolean = false
  public tituloModal: string = ''
  public mensajeModal: string = ''
  public mostrarModal: boolean = false
  private customize: Customize = new Customize()
  public form: FormGroup = new FormGroup({
    nombre_app: new FormControl()
  })


  constructor(
    private fb: FormBuilder,
    private _customizeService: CustomizeService,
    private _toastService: ToastService,
    private router: Router,
    private title: Title
  ) {
    this.getData()
  }

  ngOnInit(): void {
  }

  private getData(){
    this._customizeService.getData().subscribe((res: any) => {
      this.customize = res
      this.initForm()
      console.log(res, this.form.value)
    }, error => {
      console.log(error)
      this._toastService.showErrorMessage(error.message)
    })
  }


  private initForm(){
    this.form = this.fb.group({
      nombre_app: [this.customize.nombre_app,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  aceptarModal(){
    this.showSpinner = true
    this._customizeService.save(this.form.value).subscribe((res: any) => {
      this.handlerSuccess(res)
      this.title.setTitle(this.form.get('nombre_app')?.value)
    },error => {
      this.handlerError(error)
    })
  }

  cerrarModal(){

  }

  grabar(){
    this.mostrarModal = true
    this.mensajeModal = '¿Desea grabar los datos?'
    this.tituloModal = 'Grabar'
  }

  cancelar(){
    this.router.navigate(['/admin'])
  }

  private handlerSuccess(res: any){
    this.showSpinner = false;
    this.mostrarModal = false
    if(res['status'] === 'Token is Expired'){
      this.router.navigate(['/']);
    }else{
      if(res.tipoMensaje === 'success'){
        this._toastService.showSuccessMessage(res.mensaje);
      }else{
        this._toastService.showErrorMessage(res.mensaje);
      }
    }
  }

  private handlerError(error: any){
    console.log(error);
    this.showSpinner = false;
    this._toastService.showErrorMessage(error.message);
  }


}
