import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum ColumnStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class CreateColumnDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    board_id?: string

    @IsEnum(ColumnStatus)
    order: ColumnStatus
}