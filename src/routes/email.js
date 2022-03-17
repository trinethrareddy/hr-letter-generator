import express from 'express';
import { sendAnEmail } from '../controllers/index.js';

const emailRouter = express.Router();

emailRouter.post("/", sendAnEmail);
export default emailRouter;