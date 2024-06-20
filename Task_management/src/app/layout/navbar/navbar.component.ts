import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'Task_management';
  authToken$: Observable<boolean>; // Observable indicating the authentication status

  constructor(private authService: AuthService, private router: Router) {
    this.authToken$ = this.authService.authStatus$; // Assigning the Observable from AuthService
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
