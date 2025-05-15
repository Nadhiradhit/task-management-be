import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { ColumnService } from "./column.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateColumnDto } from "./dto/create-column.dto";

@Controller("column")
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  create(@Request() req, @Body() createColumnDto: CreateColumnDto) {
    return this.columnService.createColumn(req.user.id, createColumnDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getColumns(@Request() req) {
    return this.columnService.getColumns(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  deleteColumn(@Query("id") columnId: string) {
    return this.columnService.deleteColumn(columnId);
  }
}
