import { IsInt } from 'class-validator';

export class GetEnemiesDto {
  @IsInt()
  range: number;
}
