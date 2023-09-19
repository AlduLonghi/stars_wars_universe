import { Starship } from '../..//starships/entities/starship.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  sensitivity_to_the_force: string;

  @ManyToOne(() => Planet, (planet) => planet.population, {
    eager: true,
    onDelete: 'CASCADE',
  })
  current_location?: Planet;

  @ManyToOne(() => Starship, (starship) => starship.passengers, {
    cascade: true,
  })
  starship: Starship;
}
