import { IsEmail, isString, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(4)
    @IsString()
    username: string;

    @MinLength(8)
    @IsString()
    password: string;
}
