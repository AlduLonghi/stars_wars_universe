import { Starship } from '../entities/starship.entity';
import { IsString, Length, IsInt, IsOptional } from 'class-validator';
import { IsValidCoordinatesFormat } from 'src/common/decorators/coordinates.decorator';

export class CreateStarshipDto {
  @IsString()
  @Length(1, 40)
  name: string;

  @IsInt()
  cargo_capacity: number;

  @IsValidCoordinatesFormat()
  current_location: string;

  @IsOptional()
  @IsInt({
    each: true,
  })
  enemies?: Starship[];
}
