import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { ConstantesService } from '../constantes/constantes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient,
    private _const: ConstantesService
    ) { }

  private getFormData(fileColection: File[]){
    let form = new FormData();
    for(var i=0; i < fileColection.length; i++){
      form.append(fileColection[i].name, fileColection[i])
    }
    return form;
  }

  uploadFileWithPost(arrFiles: File[], destino: string){
    let files = this.getFormData(arrFiles)
    return this.http.post(`${this._const.endPoint}${destino}`, files, {headers: this._const.headerAttachFile()})
  }

  uploadFileWithPut(id: number, arrFiles: File[], destino: string){
    //let files: FormData = this.getFormData(arrFiles)

    let form: FormData = new FormData();
    //form.append('_method', 'PUT')
    for(var i=0; i < arrFiles.length; i++){
      debugger
      form.append('file[]', <File>arrFiles[i], arrFiles[i].name)
    }
    form.forEach(i => console.log(i))
    console.log(form);
    debugger
    return this.http.post<object>(`${this._const.endPoint}${destino}/${id}`, form, {headers: this._const.headerAttachFile()})
  }

  uploadFiles(id: number,  arrFiles: File[], destino: string):Observable<HttpEvent<any>>{
    let formData = new FormData();
    for(var i=0; i < arrFiles.length; i++){
      debugger
      formData.append('upload', arrFiles[i], arrFiles[i].name)
    }

    let params = new HttpParams();

    const options = {
      params: params,
      headers: this._const.headerAttachFile()
    };

    const req = new HttpRequest('POST', `${this._const.endPoint}${destino}/${id}`, formData, options);
    return this.http.request(req);
  }


  uploadFile(file: File, destino: string):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('upload', file, file.name)


    let params = new HttpParams();

    const options = {
      params: params,
      headers: this._const.headerAttachFile()
    };

    const req = new HttpRequest('POST', `${this._const.endPoint}${destino}`, formData, options);
    return this.http.request(req);
  }


}
