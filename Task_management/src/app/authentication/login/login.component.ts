import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb : FormBuilder, private userService: AuthService, private toastr : ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email :  new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)]),
      password : new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
    })
   }

   handle(email: string, password: string){
    this.userService.login(email,password).subscribe(
      response => {
        this.toastr.success("SUCCESSFULLY LOGIN")
        this.router.navigate(['/home']);
        this.loginForm.reset();
        console.log(response);
        },  
        error => {
          this.toastr.error('INVALID USERNAME AND PASSWORD');
          console.log(error);
        })
   }

}
