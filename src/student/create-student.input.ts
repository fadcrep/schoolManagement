import { InputType, Field } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class CreateStudentInput {

    @Field()
    @MinLength(1)
    firstname: string;

    @Field()
    @MinLength(1)
    lastname: string;

}