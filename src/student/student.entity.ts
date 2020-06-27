import { ObjectIdColumn, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Student {
    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
}