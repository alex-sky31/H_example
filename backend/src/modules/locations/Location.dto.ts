import { IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @IsNumber()
  categoryId: number;

  @IsNumber()
  id: number;

  @IsNumber()
  price: number;

  @IsNumber()
  numberOfRooms: number;

  @IsNumber()
  stars: number;

  @IsString()
  title: string;

  @IsString()
  picture: string;

  @IsString()
  description: string;

  @IsString()
  location: string;
}
