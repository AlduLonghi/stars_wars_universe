import { Character } from '../../characters/entities/character.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Starship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cargo_capacity: number;

  @Column()
  current_location: string;

  @OneToMany(() => Character, (character) => character.starship)
  passengers: Character[];

  @ManyToMany(() => Starship)
  @JoinTable()
  enemies: Starship[];
}
