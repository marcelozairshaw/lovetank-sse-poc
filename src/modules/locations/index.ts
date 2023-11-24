import { Router } from 'express';
// import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { UpdateUserLocation } from './routes/put.user-location';

const RoutesLocation = Router();

// RoutesLocation.put('/location', AuthMiddleware, UpdateUserLocation);
RoutesLocation.put('/location', UpdateUserLocation);

export { RoutesLocation };