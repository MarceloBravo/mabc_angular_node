import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptServicesService } from 'src/app/services/scriptServices/script-services.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css',
    '../../../../assets/css/app.css'
  ],
  encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom]
})
export class MainComponent implements OnInit {
  public mostrarMenu: boolean = true

  constructor(
    private _scriptService: ScriptServicesService,
  ) { }

  ngOnInit(): void {
  }

  private loadScript(){
    this._scriptService.load([
    ]);
  }

  public mostrarMenuIzquierdo(value: boolean){
    this.mostrarMenu = value
  }
}
