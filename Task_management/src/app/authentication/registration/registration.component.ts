import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/core/services/main/main-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
 
  userForm: FormGroup;

  constructor(private fb : FormBuilder, private userService: MainServiceService,private toastr: ToastrService, private router : Router) {
    this.userForm = this.fb.group({
      fname : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      lname:  new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      email :  new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)]),
      password : new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
      mobile :  new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      role : new FormControl('', [Validators.required])
    })
   }

   get user(){
     return this.userForm.controls;
   }
   handle(){
    this.userService.createUser(this.userForm.value).subscribe(
      response => {
        this.toastr.success("SUCCESSFULLY REGISTERED");
        this.router.navigate(['/login']);
        this.userForm.reset();
        },
        error => {
          this.toastr.error('NOT REGISTERED');
        })
   }
}
