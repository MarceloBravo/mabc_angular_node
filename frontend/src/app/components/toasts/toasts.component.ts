import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsComponent{

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) { return toast.message instanceof TemplateRef; }

  closeToast(toast: any){
    this.toastService.remove(toast)
  }

}
