import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    email: string;
  
}