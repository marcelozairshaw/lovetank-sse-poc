import * as redis from 'redis';
import { Request, Response } from 'express';
import { User } from '../../../models/users';
import { Location } from '../../../models/partnership';
import { calculateDistance } from '../../../helpers/distance';
import ServerSentEvent, { IDistance } from '../../../helpers/ServerSentEvent';

const subscriber  = redis.createClient({
  url: 'redis://localhost:6381'
})

subscriber.connect()

export function PartnershipDistanceSEE(req: Request, res: Response) {
  const userId = 1;

  const partner = User.getPartner(userId)
  if (!partner) throw new Error('partner-not-found');

  const { userLocation, partnerLocation } = Location.getPartnershipLocation(userId, partner.id)

  const distance = calculateDistance(
    userLocation?.latitude || 0,
    userLocation?.longitude || 0,
    partnerLocation?.latitude || 0,
    partnerLocation?.longitude || 0
  )

  const payload: IDistance = {
    userId,
    partnerId: partner.id,
    distanceValue: distance,
    distanceUnid: 'KM',
  }

  const serverSentEvent = new ServerSentEvent(req, res)
  serverSentEvent.send(payload);

  console.clear()
  console.log('### Distance generated ####')
  console.log(`Distance: ${payload.distanceValue} ${payload.distanceUnid}`);
  console.log(" ");
  console.log(`Logited User: ${userLocation?.longitude}`)
  console.log(`Latitude User:${userLocation?.latitude}`)
  console.log(`Latitude User: ${partnerLocation?.longitude}`)
  console.log(`Latitude User: ${partnerLocation?.longitude}`)

  subscriber.subscribe('location-partnership', (data: string) => {
    const value = <IDistance>JSON.parse(data);
    serverSentEvent.send(value);
  });

  serverSentEvent.close(() => {
    console.log('Closing connection');
  })
}