import { Component, OnInit } from '@angular/core';
import { TicketService } from '../_services/ticket.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css'],
  providers: [TicketService]
})
export class TicketManagementComponent implements OnInit {
  tickets: any[];
  displayedColumns: string[] = ['checked', 'Ticket ID', 'Date', 'PSA ID', 'Email', 'User Query'];
  dataSource: any;

  constructor(private ticketService: TicketService) {
    this.tickets = [];
  }

  ngOnInit() {
    this.getTickets();
  }

  getTickets = () => {
    this.ticketService.getAllTickets().subscribe(
      data => {
        this.tickets = data;
        this.dataSource = new MatTableDataSource(this.tickets);
      },
      error => {
        console.log(error);
      }
    );
  }

  highlight(ticket: Ticket) {
    ticket.highlighted = !ticket.highlighted;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Ticket {
  checked: boolean;
  highlighted?: boolean;
  hovered?: boolean;
  psa_id: string;
  date: string;
  email: string;
  user_query: string;
}
