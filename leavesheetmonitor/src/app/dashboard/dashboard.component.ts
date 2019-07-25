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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CalenderService]
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  leaves: any[];
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['PSA ID', 'Date', 'Day', 'Holiday Type', 'Apply'];
  dataSource: any;
  userDetails: any;
  userid: any;

  constructor(private http: HttpClient, private calenderService: CalenderService,
    private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.leaves = [];
  }

  ngOnInit() {
    this.userService.getUser(this.currentUser.user.pk).pipe(first()).subscribe(userDetails => {
      this.userDetails = userDetails;
      this.userid = userDetails.profile.psa_id;
      this.getLeaves();
      console.log(this);
    });
  }

  getLeaves = () => {
    this.calenderService.getAllleaves().subscribe(
      data => {
        this.leaves = data;
        console.log(this.leaves);
        this.dataSource = new MatTableDataSource(data);
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      });
  }
}
