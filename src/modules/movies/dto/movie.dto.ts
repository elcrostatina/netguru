import { IsNotEmpty, IsString } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
