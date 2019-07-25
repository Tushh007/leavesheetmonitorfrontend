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
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
  providers: [CalenderService]
})
export class HolidaysComponent implements OnInit {
  currentUser: User;
  holidays: any[];
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['Date', 'Day', 'Holiday'];
  dataSource: any;
  userDetails: any;
  userid: any;

  constructor(private http: HttpClient, private calenderService: CalenderService,
    private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.holidays = [];
  }

  ngOnInit() {
    this.userService.getUser(this.currentUser.user.pk).pipe(first()).subscribe(userDetails => {
      this.userDetails = userDetails;
      this.userid = userDetails.profile.psa_id;
      this.getHolidays();
      console.log(this);
    });
  }

  getHolidays = () => {
    this.calenderService.getAllHolidays().subscribe(
      data => {
        this.holidays = data;
        console.log(this.holidays);
        this.dataSource = new MatTableDataSource(data);
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      });
  }
}
