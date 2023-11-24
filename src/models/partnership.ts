import locations from '../fakedata/locations';

type ILocationResponse = Location | undefined

export class Location {
  id: number;
  latitude: number;
  longitude: number;
  
  userId: number;

  static getById(locationId: number): ILocationResponse  {
    return locations.find(({ id }) => id === locationId)
  }

  static getPartnershipLocation(userId: number, partnerId: number): {
    userLocation: ILocationResponse;
    partnerLocation: ILocationResponse 
  } {
    const userLocation = locations.find(({ id }) => id === userId);
    const partnerLocation = locations.find(({ id }) => id === partnerId);

    return {
      userLocation,
      partnerLocation,
    }
  }

  static update(id: number, payload: { latitude: number, logitude: number }): Location {
    const location = locations.find(({ userId }) => userId === id);
    
    if (!location) throw new Error('location-not-exist');

    location.latitude = payload.latitude;
    location.longitude = payload.logitude;

    return location;
  }
}