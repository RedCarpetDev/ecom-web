import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public getRessource(url){
    return this.http.get(this.host+url)
  }

  uploadPhotoProduct(file: File, idProduct):Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file',file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress:true,
      responseType:'text'
    });
    return this.http.request(req);
  }
}
