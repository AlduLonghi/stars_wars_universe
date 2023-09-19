export class Coordinates {
  public coordinatePattern =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  private toLongitudAndLatitud(distance1: string, distance2: string) {
    const [latitude1, longitude1] = distance1.split(',').map(parseFloat);
    const [latitude2, longitude2] = distance2.split(',').map(parseFloat);

    return { latitude1, longitude1, latitude2, longitude2 };
  }

  calculateGalacticDistance(distance1: string, distance2: string): number {
    let { latitude1, longitude1, latitude2, longitude2 } =
      this.toLongitudAndLatitud(distance1, distance2);

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
