import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    username: string;

    @IsString()
    @IsEmail()
    @MinLength(1)
    email: string;

    @IsString()
    @MinLength(1)
    password: string;

}
