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

  @OneToMany(() => Character, (character) => character.starship, {
    onDelete: 'CASCADE',
  })
  passengers: Character[];

  @ManyToMany(() => Starship, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  enemies: Starship[];
}
