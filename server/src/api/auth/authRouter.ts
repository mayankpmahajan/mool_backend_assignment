import {Router} from 'express';
import { testController } from './authController';


const authRouter = Router();
authRouter.post("/test", testController);


export default authRouter;