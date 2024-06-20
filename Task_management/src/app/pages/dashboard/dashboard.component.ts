import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { MainServiceService } from '../../core/services/main/main-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    isAdmin : boolean = false
    task: any = [];
    
    constructor(private taskService : MainServiceService, private router : Router, private authService : AuthService, private toastr : ToastrService){}

    ngOnInit(): void {
      this.isAdmin = this.authService.isAdmin();

      this.taskService.getTask().subscribe(
        data => {
          this.task = data;
        },
        error => {
          console.error('Error occurred:', error);
        }
      );
    }
    editTask(task:any): void{
      this.router.navigate([`/add_task`,task._id]);
    }

    deleteTask(task : any) : void{
      // this.router.navigate([`/show_task`,task._id])
      if(this.authService.isAdmin()){
        if(confirm(`Are you sure you want to delete`)){

          this.taskService.deleteTask(task._id).subscribe(() => {
            this.task = this.task.filter((task1:any) => task1._id !== task._id);
          });
        }
        else{
          this.router.navigate(['/show_task'])
        }
      }
      else{
        this.toastr.error('You are not Admin')
        this.router.navigate(['/home'])
      }
    }
    
}
