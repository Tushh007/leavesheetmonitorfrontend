import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({ 'content-type': 'application/jason' });

  constructor(private http: HttpClient) { }

  getIt(userid: string) {
    console.log('service');
    console.log(userid);
    return this.http.post<any>(this.baseurl + '/api/v1/report_data_for_user/', { userid });
  }

  getMatchedReports(date: string) {
    console.log('service', date);
    return this.http.post<any>(this.baseurl + '/api/v1/report_data_for_matched/', { date });
  }

  getUnmatchedReports(date: string) {
    console.log('service', date);
    return this.http.post<any>(this.baseurl + '/api/v1/report_data_for_not_matched/', { date });
  }

  getDefaulterReports(date: string) {
    console.log('service', date);
    return this.http.post<any>(this.baseurl + '/api/v1/defaulters/', { date });
  }
}
