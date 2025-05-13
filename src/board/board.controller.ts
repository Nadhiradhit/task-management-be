import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
        return this.boardService.createBoard(req.user.id, createBoardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getBoards(@Request() req) {
        return this.boardService.getBoards(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getBoardById(@Param("id") id: string) {
    if (!id) {
        throw new BadRequestException("Board ID is required");
    }
    return this.boardService.getBoardById(id);
    }

}
