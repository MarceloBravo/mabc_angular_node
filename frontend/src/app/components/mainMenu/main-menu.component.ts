import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptServicesService } from 'src/app/services/scriptServices/script-services.service';
import { MenusService } from '../../services/menus/menus.service';
import { Menu } from '../../class/menus/menu';
import { PermisosService } from '../../services/permisos/permisos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: [
    './main-menu.component.css',
  ],
  encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom
})
export class MainMenuComponent implements OnInit {
  //@HostBinding('style') style = 'display: contents';
  public menus: Menu[] = [];

  constructor(
    private _scriptService: ScriptServicesService,
    private _menusService: MenusService,
    private _permisosService: PermisosService,
    private router: Router
  ) {
    this.loadScript()
    this.getMenus();
  }

  ngOnInit(): void {
    this._permisosService.permisosActualizados$.subscribe(async() => {
      this.getMenus(true);
    })
  }

  private reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  private loadScript(){
    this._scriptService.load([
      '../../../../assets/bower_components/jquery/dist/jquery.min.js',
      '../../../../assets/bower_components/popper.js/dist/umd/popper.min.js',
      '../../../../assets/dist/js/bootstrap.min.js',
      '../../../../assets/js/app-style-switcher.js',
      '../../../../assets/js/waves.js',
      '../../../../assets/js/sidebarmenu.js',
      '../../../../assets/js/custom.js',
      '../../../../assets/bower_components/chartist/dist/chartist.min.js',
      '../../../../assets/bower_components/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js',
    ]);
  }

  private getMenus(reloadComponent: boolean = false){
    this._menusService.getMenus(1).subscribe(
      (res: any)=>{
        this.menus = res;
        if(reloadComponent)this.reloadCurrentRoute()
      },error=>{
        console.log(error);
      }
    )
  }

}
