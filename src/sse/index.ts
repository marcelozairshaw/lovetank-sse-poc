import { Router } from 'express';
import { PartnershipDistanceSEE } from './routes/post.partnership-distance-sse';

const RoutesSEE = Router();

RoutesSEE.get('/partnership-distance-see', PartnershipDistanceSEE);

export { RoutesSEE };