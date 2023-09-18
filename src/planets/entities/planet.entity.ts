import { Character } from '../../characters/entities/character.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id:number; 
 
  @Column()
  name:string;

  @Column()
  climate:string;

  @Column()
  terrain:string;

  @OneToMany(() => Character, (character) => character.current_location)
  population: Character[];

  @Column()
  coordinates:string;
}
