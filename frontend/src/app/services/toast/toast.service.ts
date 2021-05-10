import { Injectable, TemplateRef } from '@angular/core';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private pendingToast: boolean = false;
  private messagePendingToast: string = '';
  private typePendingToast: string = 'succes';
  private titlePendingToast: string = 'Información!';

  constructor() { }

  getTypeToast(){
    return this.typePendingToast;
  }

  toasts: any[] = [];

  private show(message: string | TemplateRef<any>, options: any = {}) {
    let id: Number = this.toasts.length
    this.toasts.push({ message, id, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clearToast(){
    this.toasts = [];
  }

  showSuccessMessage(mensaje: string, titulo: string = 'Información!'){
    this.show(mensaje, {
      classname: 'bg-success text-light',
      autohide: true,
      header: titulo,
      delay: 7000,
      typeOfMessage: 'bg-success'
    });
  }

  showWarningMessage(mensaje: string, titulo: string = 'Atención!'){
    this.show(mensaje, {
      classname: 'bg-warning text-light',
      autohide: true,
      header: titulo,
      delay: 7000,
      typeOfMessage: 'bg-warning'
    });
  }

  showErrorMessage(mensaje: string, titulo: string = 'Error!'){
    this.show(mensaje, {
      classname: 'bg-danger text-light',
      autohide: true,
      header: titulo,
      delay: 7000,
      typeOfMessage: 'bg-danger'
    });
  }

  //Configura un toast para ser mostrado posteriormente
  setPendingToast(message: string, typeToast: string = 'success', title: string = 'Información!'){
    this.pendingToast = true;
    this.messagePendingToast = message;
    this.typePendingToast = typeToast;
  }

  //Muestra el toast que se encuentra configurado en setPendingToast()
  showPendingToast(){
    if(this.messagePendingToast != ''){
      switch(this.typePendingToast){
        case 'success':
          this.showSuccessMessage(this.messagePendingToast, this.titlePendingToast);
          break;
        case 'warning':
          this.showWarningMessage(this.messagePendingToast, this.titlePendingToast);
          break;
        case 'danger':
          this.showErrorMessage(this.messagePendingToast, this.titlePendingToast);
          break;
        default:
          console.log('No se han configurado correctamente los toast para mostrar (typos válidos: success, warning y error', this.messagePendingToast, this.typePendingToast)
          break;
      }
      this.setPendingToast('','success','Información!');
    }

  }

}
