import { Component, EventEmitter, HostBinding, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ScriptServicesService } from 'src/app/services/scriptServices/script-services.service';

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


  constructor(
    private _scriptService: ScriptServicesService
  ) { }

  ngOnInit(): void {
    this.loadScripts()
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
