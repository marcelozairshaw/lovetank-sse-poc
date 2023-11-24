import { Router } from 'express';
// import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { PartnershipDistanceSEE } from './routes/get.partnership-distance-sse';

const RoutesSEE = Router();

// RoutesSEE.get('/partnership-distance', AuthMiddleware, PartnershipDistanceSEE);
RoutesSEE.get('/partnership-distance', PartnershipDistanceSEE);

export { RoutesSEE };