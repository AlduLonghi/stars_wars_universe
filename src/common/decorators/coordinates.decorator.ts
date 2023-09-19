import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Coordinates } from '../coordinates/coordinates';

@ValidatorConstraint({ async: true })
export class IsValidCoordinates extends Coordinates implements ValidatorConstraintInterface {
  validate(value: any) {
    return this.coordinatePattern.test(value);
  }

  defaultMessage(): string {
    return "Coordinates should have the Decimal Degrees format: '00.000000,00.000000'";
  }
}

export function IsValidCoordinatesFormat(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCoordinates,
    });
  };
}
