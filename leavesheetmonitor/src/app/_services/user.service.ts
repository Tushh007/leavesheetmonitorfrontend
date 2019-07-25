import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'content-type': 'application/jason'});

  constructor(private http: HttpClient) { }

  getUser(id): Observable<any> {
    return this.http.get(this.baseurl + '/users/users/' + id + '/', {headers: this.httpHeaders});
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl + '/users/users/', { headers: this.httpHeaders });
  }

  // tslint:disable-next-line:max-line-length
  createUser(email: string, first_name: string, last_name: string, password: string, psa_id: string, lan_id: string, sow_no: string, role: string, manager_psa_id: string, manager_name: string, manager_email: string) {
    console.log(psa_id);
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(this.baseurl + '/users/users/', { email, first_name, last_name, password, profile: {psa_id, role, lan_id, sow_no, manager_psa_id, manager_name, manager_email}});
  }

  // tslint:disable-next-line:max-line-length
  updateUser(url: string, email: string, first_name: string, last_name: string, password: string, psa_id: string, lan_id: string, sow_no: string, role: string, manager_psa_id: string, manager_name: string, manager_email: string) {
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.put<any>(url, { email, first_name, last_name, password, profile: { psa_id, lan_id, sow_no, role, manager_psa_id, manager_name, manager_email } });
  }
}
