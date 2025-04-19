import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateArticleDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @MinLength(1)
  type: string;
  
}
