import { Router } from 'express';
import { RoutesSEE } from './sse/index';

const router = Router();

router.use(RoutesSEE);

export default router;