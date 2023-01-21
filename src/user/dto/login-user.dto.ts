import { IsEmail, IsString, isString, MinLength } from "class-validator";

export class LoginUserDto{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}