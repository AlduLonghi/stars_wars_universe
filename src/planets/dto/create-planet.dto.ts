import { IsString, Length } from 'class-validator';
import { IsValidCoordinatesFormat } from '../../common/decorators/coordinates.decorator';

export class CreatePlanetDto {
  @IsString()
  @Length(1, 40)
  name: string;

  @IsString()
  climate: string;

  @IsString()
  terrain: string;

  @IsString()
  @IsValidCoordinatesFormat()
  coordinates: string;
}
