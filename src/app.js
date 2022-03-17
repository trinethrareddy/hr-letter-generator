import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import uploadRouter from './routes/upload.js';
import emailRouter from './routes/email.js';
import cors from 'cors';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/api', indexRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/sendEmail', emailRouter);

export default app;