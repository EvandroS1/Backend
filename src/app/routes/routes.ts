import { Router, Request, Response } from "express";
import userRouter from "../controllers/UserControler";

const routers = Router();

routers.use('/users', userRouter);

routers.use('/users/:id', userRouter);

routers.use('/users/getById/:id', userRouter);

export default routers;
