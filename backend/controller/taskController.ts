import { Request,Response } from "express";
import { TaskService } from "../services/taskServices";
import { inject } from "inversify";
import { Controller, controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TaskInterface } from "../interface";
import { TYPES } from "../type/types";
import { Auth } from "../middleware/auth";


@controller('/task')

export class TaskController{
    constructor(@inject(TYPES.TaskService) private taskService : TaskService){}

    @httpPost('/insert-task',Auth)
    async addTask(req: Request, res: Response):Promise<void>{
        try{
            const {title, description,status} = req.body;
            const body: TaskInterface = {title, description, status}
            await this.taskService.createTask(body);
            res.status(200).json({message : "TASK ADD SUCCESSFUL"});
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }

    @httpGet('/get-task',Auth)
    async getTask(req: Request, res: Response):Promise<void>{
        try{
            const tasks = await this.taskService.getTasks();
            res.status(200).json(tasks);
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }

    @httpGet('/id-task/:id',Auth)
    async getTaskById(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const task = await this.taskService.getTaskById(id);
            console.log(task);
            res.status(200).json(task);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    @httpPut('/edit-task/:id',Auth)
    async editTask(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.params
            const task = req.body
            const result = await this.taskService.editTask(id,task)
            res.send(result)
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    @httpDelete('/delete-task/:id',Auth)
    async deleteTask(req: Request, res: Response):Promise<void>{
        try{
            const {id} = req.params
            const result = await this.taskService.deleteTask(id)
            res.send(result)
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}