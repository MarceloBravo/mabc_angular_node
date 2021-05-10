import { Component, Input, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],

})
export class ToastComponent implements OnInit {
  @HostBinding('class') class = 'toastComponent'
  @Input() message: string = 'Sin mensajes que mostrar!';
  @Input() classname: string = ""
  @Input() header: string = "Atención!"
  @Input() smallheader: string = ""
  @Input() autohide: boolean = true
  @Input() delay: Number = 5000
  @Input() id: Number = 0
  @Input() typeOfMessage: string = 'bg-success';
  @Output() hideToast: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.setDelay()
  }


  hide(){
    this.hideToast.emit()
  }

  setDelay(){
    setTimeout(() =>{
      this.hide()
    }, <number>this.delay);
  }
}
