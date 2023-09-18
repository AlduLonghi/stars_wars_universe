import { Character } from "src/characters/entities/character.entity";
import { Starship } from "../entities/starship.entity";
import { IsString, Length, IsInt } from "class-validator";
import { IsValidCoordinatesFormat } from "src/common/decorators/coordinates.decorator";

export class CreateStarshipDto {
    @IsString()
    @Length(1, 40)
    name:string;

    @IsInt()
    cargo_capacity:number;

    @IsValidCoordinatesFormat()
    current_location:string

    @IsInt({
        each: true,
    })
    enemies: Starship[]
};
