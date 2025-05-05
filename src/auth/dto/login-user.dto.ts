import { IsString, IsEmail, MinLength } from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    @MinLength(1)
    email: string;

    @IsString()
    @MinLength(1)
    password: string;
}