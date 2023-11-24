import * as redis from 'redis';
import { Request, Response } from 'express';
import { User } from '../../../models/users';
import { Location } from '../../../models/partnership';
import { calculateDistance } from '../../../helpers/distance';

const publisher = redis.createClient({
  url: 'redis://localhost:6381'
})

publisher.connect()

export function UpdateUserLocation(req: Request, res: Response) {
  const userId = 1;

  const paylaod = {
    latitude: Number(req.headers['x-geolocation-latitude']),
    logitude: Number(req.headers['x-geolocation-longitude']),
  }

  Location.update(userId, paylaod)

  const partner = User.getPartner(userId)
  if (!partner) throw new Error('partner-not-found');

  const { userLocation, partnerLocation } = Location.getPartnershipLocation(userId, partner.id)

  const distance = calculateDistance(
    userLocation?.latitude || 0,
    userLocation?.longitude || 0,
    partnerLocation?.latitude || 0,
    partnerLocation?.longitude || 0
  )

  publisher.publish('location-partnership', JSON.stringify({
    userId: userId,
    partnerId: partner.id,
    distanceValue: distance,
    distanceUnid: 'KM',
  }))

  return res.status(201).json({
    message: 'Location updated'
  })
}