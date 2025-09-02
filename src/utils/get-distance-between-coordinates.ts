import GeoPoint from 'geopoint'

export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  const fromPoint = new GeoPoint(from.latitude, from.longitude)
  const toPoint = new GeoPoint(to.latitude, to.longitude)
  const inKilometers = true

  return fromPoint.distanceTo(toPoint, inKilometers)
}
