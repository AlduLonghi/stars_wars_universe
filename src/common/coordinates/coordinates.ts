/* eslint-disable prefer-const */
export class Coordinates {
  public coordinatePattern =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  toLatitudeAndLongitude(distance: string) {
    const [latitude, longitude] = distance.split(',').map(parseFloat);
    return { latitude, longitude };
  }

  calculateGalacticDistance(distance1: string, distance2: string): number {
    let { latitude: latitude1, longitude: longitude1 } =
      this.toLatitudeAndLongitude(distance1);

    let { latitude: latitude2, longitude: longitude2 } =
      this.toLatitudeAndLongitude(distance2);

    const earthRadiusKm = 10000; // Imaginary radius of a galactic system in kilometers
    const dLat = this.degreesToRadians(latitude2 - latitude1);
    const dLon = this.degreesToRadians(longitude2 - longitude1);

    latitude1 = this.degreesToRadians(latitude1);
    latitude2 = this.degreesToRadians(latitude1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(latitude1) *
        Math.cos(latitude2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return Math.floor(distance);
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
