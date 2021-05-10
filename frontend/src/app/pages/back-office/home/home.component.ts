import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptServicesService } from 'src/app/services/scriptServices/script-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../../assets/css/googleapi.css',
    '../../../../assets/css/bootstrap/css/bootstrap.min.css',
    '../../../../assets/icon/themify-icons/themify-icons.css',
    '../../../../assets/icon/icofont/css/icofont.css',
    '../../../../assets/css/style.css',
    '../../../../assets/css/jquery.mCustomScrollbar.css',
  ],
  encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom
})
export class HomeComponent implements OnInit {

  constructor(
    private _scriptService: ScriptServicesService,
  ) {
    this.loadScript()
  }

  ngOnInit(): void {
  }


  private loadScript(){
    this._scriptService.load([
      '../../../../assets/js/jquery/jquery.min.js',
      '../../../../assets/js/jquery-ui/jquery-ui.min.js',
      '../../../../assets/js/popper.js/popper.min.js',
      '../../../../assets/js/bootstrap/js/bootstrap.min.js',
      '../../../../assets/js/jquery-slimscroll/jquery.slimscroll.js',
      '../../../../assets/js/modernizr/modernizr.js',
      '../../../../assets/pages/widget/amchart/amcharts.min.js',
      '../../../../assets/pages/widget/amchart/serial.min.js',
      '../../../../assets/pages/todo/todo.js',
      '../../../../assets/pages/dashboard/custom-dashboard.js',
      '../../../../assets/js/script.js',
      '../../../../assets/js/SmoothScroll.js',
      '../../../../assets/js/pcoded.min.js',
      '../../../../assets/js/demo-12.js',
      '../../../../assets/js/jquery.mCustomScrollbar.concat.min.js',
    ]);
  }
}
