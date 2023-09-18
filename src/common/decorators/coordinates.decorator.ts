import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidCoordinates implements ValidatorConstraintInterface {
  validate(value: any) {
    const coordinatePattern =
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    return coordinatePattern.test(value);
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
