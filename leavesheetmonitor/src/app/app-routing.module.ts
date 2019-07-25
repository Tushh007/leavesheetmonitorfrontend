import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home';
import { AuthGuard } from './_guards';
import { SupportComponent } from './support/support.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { MemberComponent } from './member/member.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard] },
  { path: 'member', component: MemberComponent, canActivate: [AuthGuard] },
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'support', component: SupportComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
