import { Component, EventEmitter, HostBinding, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/class/User/user';
import { ScriptServicesService } from 'src/app/services/scriptServices/script-services.service';
import { LoginService } from '../../services/login/login.service';
import { ConstantesService } from '../../services/constantes/constantes.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Title } from '@angular/platform-browser';
import { CustomizeService } from '../../services/customize/customize.service';

@Component({
  selector: 'app-header-nabvar',
  templateUrl: './header-nabvar.component.html',
  styleUrls: [
    './header-nabvar.component.css',
    '../../../assets/css/style.css',
  ],
  encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom
})
export class HeaderNabvarComponent implements OnInit {
  @HostBinding('style') style = 'display: contents';
  @Output() showLeftMenu = new EventEmitter<boolean>()
  public showProfileMenu: boolean = false
  public leftMenuIsVisible: boolean = true
  public avatarImage: string = ''
  public nombreUsuario: string = ''


  constructor(
    private _scriptService: ScriptServicesService,
    private _usuariosService: UsuariosService,
    private _loginServices: LoginService,
    private _const: ConstantesService,
    private _config: CustomizeService,
    private title: Title,
  ) {
    this.cargarAvatar()
  }

  ngOnInit(): void {
    this.loadScripts()
    this._usuariosService.avatarActualizado$.subscribe((urlFoto: string) => {
      this.avatarImage = this._const.storageImages + 'avatars/' + urlFoto
    })

    this._config.getData().subscribe((res: any) => {
      this.title.setTitle(res.nombre_app)
    },error => {
      console.log(error)
    })
  }

  private cargarAvatar(){
    let user: User | null = this._loginServices.getUsuarioActual()
    this.avatarImage = (user && user.foto) ? this._const.storageImages + 'avatars/' + user.foto : this._const.srcDefault
    this.nombreUsuario = user ? user.name : 'Desconocido...'
  }

  private loadScripts(){
    this._scriptService.load([
    ]
    )
  }

  public showHideProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu
  }

  public showHideLeftMenu(){
    this.leftMenuIsVisible = !this.leftMenuIsVisible
    this.showLeftMenu.emit(this.leftMenuIsVisible)
  }
}
