import {TaskInterface } from "../interface/taskInterface"
import { Schema, model } from 'mongoose'

const taskSchema = new Schema<TaskInterface>({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
})

export const TaskModel = model<TaskInterface>('task', taskSchema)
