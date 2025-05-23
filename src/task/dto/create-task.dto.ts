import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    assigned_to: string
}