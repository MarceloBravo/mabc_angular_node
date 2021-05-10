import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Menu } from '../../../class/menus/menu';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  encapsulation: ViewEncapsulation.None //Permite que la etiqueta del componente de angular no sea considerada en el dom
})
export class SubMenuComponent implements OnInit {
  @Input() menu?: Menu
  @Input() className: string = 'sidebar-item'

  constructor() {}

  ngOnInit(): void {
  }

}
