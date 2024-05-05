import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MinLength(3)
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MinLength(10)
    @MaxLength(30)
    email: string;

}
