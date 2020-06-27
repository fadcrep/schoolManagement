import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentService } from "./student.service";
import { Student } from "./student.entity";
import { CreateStudentInput } from "./create-student.input";


@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studentService: StudentService
    ) { }


    @Mutation(returns => StudentType)
    async createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ): Promise<Student> {

        return this.studentService.createStudent(createStudentInput);
    }

    @Query(returns => [StudentType])
    async students(): Promise<Student[]> {
        return this.studentService.getStudents();
    }


    @Query(returns => StudentType)
    async student(
        @Args('id') id: string
    ): Promise<Student> {
        return this.studentService.getStudent(id);
    }
}