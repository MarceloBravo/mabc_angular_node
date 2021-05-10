import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginacion } from 'src/app/class/paginacion/paginacion';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  @Input() paginacion: Paginacion = new Paginacion();
  @Input() rutaGet: string = '';
  @Output() paginaSiguiente: EventEmitter<number> = new EventEmitter();
  @Output() paginaAnterior: EventEmitter<number> = new EventEmitter();
  @Output() mostrarPagina: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  anterior(){
    return this.paginaAnterior.emit(this.paginacion.pagina -1);
  }

  irA(pag: number){
    return this.mostrarPagina.emit(pag);
  }

  siguiente(){
    return this.paginaSiguiente.emit(this.paginacion.pagina + 1);
  }
}
