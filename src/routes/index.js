import express from 'express';
import { indexPage, getLogs, getTemplates } from '../controllers/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/getTemplates', getTemplates);
indexRouter.get('/logs', getLogs);
export default indexRouter;
