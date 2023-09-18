import { IsString, Length, IsIn, IsOptional, IsInt } from 'class-validator';
import { Planet } from 'src/planets/entities/planet.entity';

const sensitivity = ['low', 'medium', 'high'];

export class CreateCharacterDto {
  @IsString()
  @Length(1, 40)
  name: string;

  @IsString()
  @Length(1, 40)
  species: string;

  @IsIn(sensitivity)
  sensitivity_to_the_force: string;

  @IsOptional()
  @IsInt()
  current_location?: Planet;
}
