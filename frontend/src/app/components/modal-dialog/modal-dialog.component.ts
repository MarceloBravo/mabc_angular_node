import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  @Input() titulo: string = 'Atención';
  @Input() mensaje: string = 'Este es un modal.';
  @Input() mostrar: boolean = false;
  @Input() textoBtnAceptar: string = 'Aceptar';
  @Input() textoBtnCancelar: string = 'Cancelar';
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() aceptar: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    this.mostrarChange(changes.mostrar.currentValue);

}

  btnCancelar(){
    this.cerrar.emit(false);
  }

  btnAceptar(){
    this.aceptar.emit(true);
  }


  private mostrarChange(mostrar: any){
    //console.log('MOSTRAR  MODAL', mostrar ? 'show' : 'hide')
    if(mostrar){
      var el = <HTMLButtonElement>document.getElementById('btnShowModal');
    }else{
      var el = <HTMLButtonElement>document.getElementById('btnHidewModal');
    }
    el.click();
  }
}
