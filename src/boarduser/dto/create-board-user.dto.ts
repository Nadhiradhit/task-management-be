import { IsString, IsOptional } from "class-validator";

export class CreateBoardUserDto {
  @IsString()
  @IsOptional()
  board_id?: string;
}
