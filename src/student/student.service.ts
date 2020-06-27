import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Mutation } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';


@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) { }


    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {

        const { firstname, lastname } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstname,
            lastname
        })
        return this.studentRepository.save(student);
    }

    async getStudents(): Promise<Student[]> {
        const students = this.studentRepository.find();

        if (!students) {
            return []
        }
        return students;
    }

    async getStudent(id: string): Promise<Student> {
        const student = this.studentRepository.findOne({ id });

        if (!student) {
            throw new NotFoundException('STUDENT NOT FOUND ');
        }
        return student;
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds
                }
            }
        });
    }
}
