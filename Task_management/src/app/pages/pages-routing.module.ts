import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { TaskComponent } from '../pages/task/task.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth-guard.guard';
import { AdminGuard } from '../core/guards/admin-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'add_task', component: TaskComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'add_task/:id', component: TaskComponent, canActivate: [AuthGuard] },
  { path:'show_task', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'show_task/:id', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
