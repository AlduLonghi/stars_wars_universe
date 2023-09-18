import { Planet } from '../../planets/entities/planet.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    species:string;

    @Column()
    sensitivity_to_the_force:string

    @ManyToOne(() => Planet, (planet) => planet.population, {
        eager: true,
    })
    @JoinColumn()
    current_location?: Planet;
}
