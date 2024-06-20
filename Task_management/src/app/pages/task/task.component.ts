import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth-service.service';
import { MainServiceService } from '../../core/services/main/main-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  isEditMode = false; 
  taskId !: string | null
  addTask : FormGroup
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private taskService: MainServiceService, private authService: AuthService) {
    this.addTask =  this.fb.group({
      title : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      description : new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+\s[a-zA-Z]+)+$/)]),
      status : new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    const admin = this.authService.isAdmin()
    console.log(admin);
    if(admin === false) {
      this.addTask.get('title')?.disable();
      this.addTask.get('description')?.disable();
    }

    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.taskId;

   

    if (this.isEditMode && this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(
        response => {
          this.addTask.patchValue(response);
        },
        error => {
          console.error('Error occurred:', error);
        })
    }
  }

  get task(){
    return this.addTask.controls
  }

  onSubmit(){
    if (this.addTask.valid) {
      if(this.isEditMode === true) {
        this.taskService.editTask(this.taskId as string, this.addTask.value).subscribe(
          response => {
            this.router.navigate(['show_task'])
            this.addTask.reset();
          },
          error => {
            console.error('Error occurred:', error);
          })
      }
      else {
        this.taskService.createTask(this.addTask.value).subscribe(
          response => {
              this.router.navigate(['show_task'])
              this.addTask.reset();
            },
            error => {
              console.error('Error occurred:', error);
            })
      }     
    }
  }
}
