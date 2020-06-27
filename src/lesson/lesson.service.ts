import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>
    ) { }

    async getLesson(id: string): Promise<Lesson> {
        const lesson = this.lessonRepository.findOne({ id });

        if (!lesson) {
            throw new NotFoundException('LESSON NOT FOUND');
        }

        return this.lessonRepository.findOne({ id });
    }

    async getLessons(): Promise<Lesson[]> {

        const lessons = this.lessonRepository.find();
        if (!lessons) {
            return []
        }
        return lessons;
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });

        return this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [...lesson.students, ...studentIds];
        return this.lessonRepository.save(lesson);

    }


}
