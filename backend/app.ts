import 'reflect-metadata';
import express from 'express';
import { Connection } from './config/db/connection';
import cookieParser from 'cookie-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import {container} from './config/inversify.config';

import cors from 'cors'

const db = new Connection();
db.connections();

const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: (origin : any, callback : any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};



const server = new InversifyExpressServer(container);
server.setConfig(app => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions))
});



const app = server.build();
app.listen(3000, (): void => {
  console.log(`Server is running at port ${3000}`);
});
