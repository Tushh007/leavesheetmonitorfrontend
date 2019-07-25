import { Component, OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EmailService } from '../_services/email.service';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [UserService],
})
export class UserManagementComponent implements OnInit {
  users: any[];
  displayedColumns: string[] = ['PSA ID', 'Name', 'Email', 'LAN ID', 'SOW', 'Role', 'Manager PSA ID', 'Manager Name', 'Manager Email'];
  dataSource: any;
  expandedElement: UserElement | null;
  userRegistrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  details: [];
  error = '';
  msg;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    public snackBar: MatSnackBar
    ) {
    this.users = [];
  }

  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({
      url: ['', Validators.required] ,
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],
      password: ['', Validators.required],
      psa_id: ['', Validators.required],
      lan_id: ['', Validators.required],
      sow_no: ['', Validators.required],
      role: ['', Validators.required],
      manager_psa_id: ['', Validators.required],
      manager_name: ['', Validators.required],
      manager_email: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.getUsers();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userRegistrationForm.controls; }

  onSubmit(value) {
    console.log(value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.userRegistrationForm.invalid) {
      return;
    }

    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.user.updateUser(value.url, value.email, value.first_name, value.last_name, value.password, value.psa_id, value.lan_id, value.sow_no, value.role, value.manager_psa_id, value.manager_name, value.manager_email)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.snackBar.open('User Updated Succesfull.', 'close', {
            duration: 10000,
          });

          window.location.reload();
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  getUsers = () => {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

// userelement

export interface UserElement {
  psa_id: string;
  name: string;
  email: string;
  lan_id: string;
  sow_no: string;
  role: string;
  manager_psa_id: string;
  manager_name: string;
  manager_email: string;
}

// user-registration component

@Component({
  selector: 'app-user-registration-dialog',
  templateUrl: 'user-registration-dialog.html',
  styleUrls: ['./user-registration-dialog.css'],
})
export class UserRegistrationDialogComponent implements OnInit {
  userRegistrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  details: [];
  error = '';
  msg;
  emailResponse: any;


  mydate = Date.now();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private emailService: EmailService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],
      password: ['', Validators.required],
      psa_id: ['', Validators.required],
      lan_id: ['', Validators.required],
      sow_no: ['', Validators.required],
      role: ['', Validators.required],
      manager_psa_id: ['', Validators.required],
      manager_name: ['', Validators.required],
      manager_email: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.userRegistrationForm.controls; }

  onSubmit(value) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userRegistrationForm.invalid) {
      return;
    }

    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.user.createUser(value.email, value.first_name, value.last_name, value.password, value.psa_id, value.lan_id, value.sow_no, value.role, value.manager_psa_id, value.manager_name, value.manager_email)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.snackBar.open('User Registration Succesfull.', 'close', {
            duration: 10000,
          });

          window.location.reload();
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.emailService.sendIt('user_registered', value.email).subscribe(
      emailData => {
        this.emailResponse = emailData;
        console.log('ticketmailflag');
        console.log(this.emailResponse);
      },
      error => {
        console.log(error);
      });
  }
 }
