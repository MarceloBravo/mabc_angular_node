import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ScriptServicesService } from '../../../services/scriptServices/script-services.service';
import { ToastService } from '../../../services/toast/toast.service';
import { CustomizeService } from '../../../services/customize/customize.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ]
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    password: new FormControl(),
    email: new FormControl(),
    remember: new FormControl()
  })
  public showToast: boolean = false
  public nombreApp: string = ''

  constructor(
    private _loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title,
    private _scriptService: ScriptServicesService,
    private _toastService: ToastService,
    private _config: CustomizeService
  ) {
    this._scriptService.load([
      '//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
      '//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
      '//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js',
      '//code.jquery.com/jquery-1.11.1.min.js'
      ]);
    this.initForm();

   }

  ngOnInit(): void {
    this._config.getData().subscribe((res: any)=> {
      this.nombreApp = res.nombre_app
      this.title.setTitle(res.nombre_app)
    }, error => {
      console.log(error)
      this._toastService.showErrorMessage(error.message)
    });
  }

  private initForm(){
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email:['',[Validators.required, Validators.email]],
      remember:false
    })
  }

  login(){
    this._loginService.login(this.loginForm).subscribe(
      (res: any) => {
        if(res.status !== 200){
          if(this._loginService.validaToken(res['access_token'])){
            this._loginService.registrarToken(res['access_token'], this.loginForm.value['remember']);
            this._loginService.setUsuarioActual(res['user']);
            this._loginService.setRolesUsuario(res['roles']);
            this.router.navigate(['/admin']);
          }
          this._toastService.clearToast();
        } else{
          this.showToast = true;
        }
    },error=>{
      console.log(error)
      this._toastService.showErrorMessage(error.status !== 401 ? error.message : 'Usuario y/o contraseña no validos', 'Error!!')

    });
  }
}
