import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

/// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoutes);

const getAcontroller = (req: Request, res: Response) => {
  res.send(`hello from Mongoose-express-crud-server`);
};

app.get('/', getAcontroller);

export default app;
