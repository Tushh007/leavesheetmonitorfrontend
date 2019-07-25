import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../_services/ticket.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { EmailService } from '../_services/email.service';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  providers: [TicketService]
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  emailResponse: any;
  details: [];
  error = '';
  msg;


  mydate = Date.now();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticket: TicketService,
    private emailService: EmailService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.supportForm = this.formBuilder.group({
      psa_id: ['', Validators.required],
      email: ['', Validators.required],
      user_query: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.supportForm.controls; }

  onSubmit(value) {
    this.submitted = true;

    console.log(value.psa_id);

    // stop here if form is invalid
    if (this.supportForm.invalid) {
      return;
    }


    this.loading = true;

    this.emailService.sendIt('ticket_submitted', value.email).subscribe(
      emailData => {
        this.emailResponse = emailData;
        console.log('ticketmailflag');
        console.log(this.emailResponse);
      },
      error => {
        console.log(error);
      });

    this.ticket.createTicket(value.psa_id, value.email, value.user_query)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.snackBar.open('Ticket Submitted Succesfully.', 'close', {
            duration: 10000,
          });
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }
}

