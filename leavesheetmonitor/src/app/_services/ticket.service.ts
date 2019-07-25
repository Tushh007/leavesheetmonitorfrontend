import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class TicketService {

  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({ 'content-type': 'application/jason' });

  constructor(private http: HttpClient) {  }

  createTicket(psa_id: string, email: string, user_query: string) {
    return this.http.post<any>(this.baseurl + '/support/tickets/', { psa_id, email, user_query });
  }

  getAllTickets(): Observable<any> {
    return this.http.get(this.baseurl + '/support/tickets/', { headers: this.httpHeaders });
  }
}
