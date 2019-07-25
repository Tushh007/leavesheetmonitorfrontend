import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatStepperModule, MatStep } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-Layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SupportComponent } from './support/support.component';
import { ManagerComponent } from './manager/manager.component';
import { MemberComponent } from './member/member.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MemberInformationComponent } from './member-information/member-information.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserManagementComponent, UserRegistrationDialogComponent } from './user-management/user-management.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { MatTableModule } from '@angular/material/table';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatInputModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCheckboxModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';
import { HolidaysComponent } from './holidays/holidays.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SupportComponent,
    ManagerComponent,
    MemberComponent,
    AdministratorComponent,
    MemberInformationComponent,
    UserManagementComponent,
    TicketManagementComponent,
    UserRegistrationDialogComponent,
    DashboardComponent,
    CalenderComponent,
    HolidaysComponent
  ],
  entryComponents: [UserRegistrationDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTabsModule,
    MatGridListModule,
    MatFileUploadModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
