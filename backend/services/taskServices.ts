import { TaskInterface } from "../interface";
import { TaskModel } from "../models";
import { inject, injectable } from "inversify";


@injectable()
export class TaskService {

    async createTask(body : TaskInterface) : Promise<void>{
        const {title,description,status} = body
        const sanitizedBody =  { title,description,status }
        const newUser = new TaskModel(sanitizedBody)
        await newUser.save()
    }

    async getTasks() : Promise<TaskInterface[]>{
        const tasks = await TaskModel.find()
        return tasks
    }

    async getTaskById(id : string) {
        const task = await TaskModel.findOne({_id:id})
        return task
    }

    async editTask(id:string, task : TaskInterface):Promise<any>{
        const result =  await TaskModel.findOneAndUpdate(task)
        return result
    }
    
    async deleteTask(id:string):Promise<any>{
        const result =  await TaskModel.findOneAndDelete({_id:id})
        return result
    }
}