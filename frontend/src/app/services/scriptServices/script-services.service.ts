import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptServicesService {
  private scripts: any = {};

  constructor() {

  }

  // load a single or multiple scripts
  load(srcs: string[]) {
    for(let i=0; i < srcs.length; i++){
      const nodo = document.createElement('script');
      nodo.src = srcs[i];
      nodo.type ='text/javascript';
      nodo.async = false;
      document.getElementsByTagName('head')[0].appendChild(nodo);
    }
  }

}
