import { IsString, Length } from 'class-validator';
import { Geometry } from 'geojson';
import { Character } from 'src/characters/entities/character.entity';

export class CreatePlanetDto {
    @IsString()
    @Length(1, 40)
    name:string;

    @IsString()
    climate:string;

    @IsString()
    terrain:string;

    population:Character[];
    // current_location:Geometry;
}
