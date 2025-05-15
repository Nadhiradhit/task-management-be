import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ColumnStatus } from '@prisma/client';

export class UpdateColumnDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(ColumnStatus)
  @IsOptional()
  order?: ColumnStatus;

  @IsString()
  @IsOptional()
  board_id?: string;
} 