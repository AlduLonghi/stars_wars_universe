import { IsString, Length, IsIn } from 'class-validator';

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
}
