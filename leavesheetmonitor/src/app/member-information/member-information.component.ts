import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../_models';

@Component({
  selector: 'app-member-information',
  templateUrl: './member-information.component.html',
  styleUrls: ['./member-information.component.css']
})
export class MemberInformationComponent implements OnInit {

  userDetails: any;
  currentUser: User;
  psa_id: any;
  manager_psa_id: any;
  manager_name: any;
  first_name: any;
  last_name: any;
  lan_id: any;
  sow_no: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.userService.getUser(this.currentUser.user.pk).pipe(first()).subscribe(userDetails => {
      this.userDetails = userDetails;
      console.log(this.userDetails);
      this.first_name = userDetails.first_name;
      this.last_name = userDetails.last_name;
      this.psa_id = userDetails.profile.psa_id;
      this.lan_id = userDetails.profile.lan_id;
      this.sow_no = userDetails.profile.sow_no;
      this.manager_psa_id = userDetails.profile.manager_psa_id;
      this.manager_name = userDetails.profile.manager_name;

    });
  }

}
