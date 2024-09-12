import {
  IsString,
  IsISO8601,
  IsOptional,
  Min,
  IsInt,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserFindManyDTO {
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({
    type: [String],
    description: 'Array de Ids de usuários',
  })
  users?: string[];

  @IsOptional()
  @IsISO8601({}, { message: 'A data inicial deve possuir o formato ISO 8601.' })
  @ApiPropertyOptional({
    description: 'A data inicial deve possuir o formato ISO 8601.',
  })
  startAt?: string;

  @IsOptional()
  @IsISO8601({}, { message: 'A data final deve possuir o formato ISO 8601.' })
  @ApiPropertyOptional({
    description: 'A data final deve possuir o formato ISO 8601.',
  })
  endAt?: string;

  @ApiProperty({
    description: 'Número da página, deve ser um inteiro maior ou igual a 1',
    example: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'O valor deve ser um número inteiro.' })
  @Min(1, { message: 'O valor deve ser maior ou igual a 1.' })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description:
      'Número de registros por página, deve ser um inteiro menor ou igual a 100',
    example: 10,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'O valor deve ser um número inteiro.' })
  @Min(1, { message: 'O valor deve ser maior ou igual a 1.' })
  @Max(100, { message: 'O valor deve ser menor ou igual a 100.' })
  @IsOptional()
  take?: number;
}
