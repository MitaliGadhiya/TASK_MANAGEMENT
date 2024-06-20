import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(private http : HttpClient) { }

  createTask(data : any){
    return this.http.post('http://localhost:3000/task/insert-task',data);
  }

  getTask(){
    return this.http.get('http://localhost:3000/task/get-task');
  }

  getTaskById(id: string){
    return this.http.get(`http://localhost:3000/task/id-task/${id}`);
  }

  editTask(id : string,data: any){
    return this.http.put(`http://localhost:3000/task/edit-task/${id}`,data)
  }
  deleteTask(id : string){
    return this.http.delete(`http://localhost:3000/task/delete-task/${id}`)
  }

  createUser(data :any){
    return this.http.post('http://localhost:3000/user/insert-user',data);
  }

  login(data :any){
    console.log(data);
    return this.http.post('http://localhost:3000/user/login-user',data);
  }
}
