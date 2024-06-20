import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../authentication/registration/registration.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from '../core/guards/login-guard.guard';

const routes: Routes = [
  {path : 'registration', component : RegistrationComponent},
  {path : 'home', component  : HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
