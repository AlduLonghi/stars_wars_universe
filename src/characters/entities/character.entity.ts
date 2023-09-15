import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    current_location:string;
}
