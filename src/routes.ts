import { Router } from 'express';
import { RoutesSEE } from './modules/distance';
import { RoutesLocation } from './modules/locations';

const router = Router();

router.use('/sse', RoutesSEE);
router.use('/user', RoutesLocation);

export default router;