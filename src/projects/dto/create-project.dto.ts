import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsString()
  @IsNotEmpty()
  coverImg!: string;

  @IsArray()
  @IsString({ each: true }) // checking each array item if string
  @IsNotEmpty({ each: true }) // Ensures array items are not empty strings
  subImg!: string[]; 
}
