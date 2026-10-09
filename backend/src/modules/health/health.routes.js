import { Router } from 'express';

import healthStatus from './health.controller.js';

const healthRouter = Router();

healthRouter.get('/status', healthStatus);

export default healthRouter;