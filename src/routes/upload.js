import express from 'express';
import { upload } from '../controllers/index.js';
import {uploadFile } from '../middleware/upload.js';

const uploadRouter = express.Router();

uploadRouter.post("/", uploadFile.single("file"), upload);
export default uploadRouter;