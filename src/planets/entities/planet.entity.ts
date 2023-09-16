import { Character } from 'src/characters/entities/character.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

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

  @OneToMany(() => Character, (character) => character.current_location, {
    eager: true,
  })
  population: Character[];
}
