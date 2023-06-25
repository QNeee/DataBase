import express from 'express';
import logger from 'morgan';
import cors from 'cors';
// import { dataRoutes } from './Routes/dataRoutes';
export const app = express();

const formatLogger = app.get('env') === "development" ? "dev" : "short";
app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());
// app.use('/api/data', dataRoutes)