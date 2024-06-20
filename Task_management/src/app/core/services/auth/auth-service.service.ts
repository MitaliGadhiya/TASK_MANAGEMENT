import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = {email, password}
    return this.http.post<{ token: string, message: string }>('http://localhost:3000/user/login-user', loginData)
      .pipe(
        tap(response => {
          this.token = response.token;
          if (this.token) {
            localStorage.setItem('authToken', this.token);
            this.authStatusSubject.next(true); 
          } else {
            console.error('Token is undefined:', response);
          }
        })
      );
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token;
  }

   logout(): void {
    localStorage.removeItem('authToken');
    this.authStatusSubject.next(false); // Update auth status
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null; 
  }

  isAdmin(): any {
    const token = localStorage.getItem('authToken');
    console.log("token : ",token);
    if(token){
      const decode:any = jwtDecode(token);
      console.log("Decoded : ",decode)
      const role = decode.role;
      console.log(role);
      return localStorage.getItem('authToken') !== null && role === 'admin';
    }
    
  }
}
