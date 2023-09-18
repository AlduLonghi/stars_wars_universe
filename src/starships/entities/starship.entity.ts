import { Character } from "src/characters/entities/character.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class Starship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    cargo_capacity:number;

    @Column()
    current_location:string

    @OneToMany(() => Character, (character) => character.starship)
    passengers: Character[];

    @ManyToMany(() => Starship, (starship) => starship.enemies)
    enemies: Starship[]
};
