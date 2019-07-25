import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

import { User } from '../_models';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    userDetails: any;
    currentUser: User;
    id: number;
    first_name: string;
    role: any;
    administrator: boolean;
    member: boolean;
    manager: boolean;

    constructor(private router: Router,
        private authenticationService: AuthenticationService, private userService: UserService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

        this.id = this.currentUser.user.pk;
        this.first_name = this.currentUser.user.first_name;
         }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.userService.getUser(this.currentUser.user.pk).pipe(first()).subscribe(userDetails => {
            this.userDetails = userDetails;
            this.role = this.userDetails.profile.role;
            if (this.role === 'administrator') {
                this.administrator = true;
            }
            if (this.role === 'manager') {
                this.manager = true;
            }
            if (this.role === 'member') {
                this.member = true;
            }
        });
     }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}

