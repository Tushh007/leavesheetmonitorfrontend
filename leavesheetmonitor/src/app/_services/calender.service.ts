import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  baseurl = 'http://127.0.0.1:8000/calender';
  httpHeaders = new HttpHeaders({ 'content-type': 'application/jason' });

  constructor(private http: HttpClient) { }

  getAllHolidays(): Observable<any> {
    return this.http.get(this.baseurl + '/holidays/', { headers: this.httpHeaders });
  }

  getAllleaves(): Observable<any> {
    return this.http.get(this.baseurl + '/leaves/', { headers: this.httpHeaders });
  }

  getAlldetails(): Observable<any> {
    return this.http.get(this.baseurl + '/calender/', { headers: this.httpHeaders });
  }
}
