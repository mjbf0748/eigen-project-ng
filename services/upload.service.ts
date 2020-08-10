import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private SERVER_URL = 'http://198.211.96.22:5000';
  constructor(private httpClient: HttpClient) {  }

  upload(file: FileList): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    for (let doc of file[Symbol.iterator]()) {
      formData.append(doc.name, doc, doc.name);
    }





    const req = new HttpRequest('POST', `${this.SERVER_URL}/api`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.SERVER_URL}/files`);
  }

}
