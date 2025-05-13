import { IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_public: boolean;
}
