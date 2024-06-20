import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth/auth-service.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(
    private _token: AuthService,
    private _locationService: Location,
    private router : Router
  ) {} 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this._token.isAuthenticated();
    if (accessToken) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}