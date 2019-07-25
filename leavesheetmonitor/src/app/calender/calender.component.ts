import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models';
import { first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CalenderService } from '../_services/calender.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
  providers: [CalenderService]
})
export class CalenderComponent implements OnInit {
  currentUser: User;
  calander: any[];
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['Month', 'Date', 'Day', 'Day Type'];
  dataSource: any;
  userDetails: any;
  userid: any;

  constructor(private http: HttpClient, private calenderService: CalenderService,
    private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.calander = [];
  }

  ngOnInit() {
    this.userService.getUser(this.currentUser.user.pk).pipe(first()).subscribe(userDetails => {
      this.userDetails = userDetails;
      this.userid = userDetails.profile.psa_id;
      this.getCalander();
      console.log(this);
    });
  }

  getCalander = () => {
    this.calenderService.getAlldetails().subscribe(
      data => {
        this.calander = data;
        console.log(this.calander);
        this.dataSource = new MatTableDataSource(data);
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      });
  }
}
