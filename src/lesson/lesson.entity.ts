import { Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";
import { Student } from "src/student/student.entity";

@Entity()
export class Lesson {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    students: string[];
}