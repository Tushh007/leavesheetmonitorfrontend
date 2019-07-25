import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({ 'content-type': 'application/jason' });

  constructor(private http: HttpClient) { }

  sendIt(type: string, email: string) {
    return this.http.post<any>(this.baseurl + '/api/v1/notification_mail/', { type, email });
  }
}
