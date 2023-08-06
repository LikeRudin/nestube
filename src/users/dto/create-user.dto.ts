import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    readonly username:string;

    @IsString()
    readonly password:string;

    @IsString()
    readonly passwordConfirm: string;
    
    @IsEmail()
    readonly email: string;

    @IsNumber()
    readonly age: number;

    @IsString()
    readonly gender: string;
}
