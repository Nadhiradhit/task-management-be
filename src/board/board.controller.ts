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
  Delete,
  Put,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
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

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteBoard(@Param("id") id: string) {
        return this.boardService.deleteBoard(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateBoard(
        @Param("id") id: string,
        @Body() updateBoardDto: UpdateBoardDto,
        @Request() req,
        @Body() rawBody: any
    ) {
      console.log(rawBody, "Controller rawBody");
    
        return this.boardService.updateBoard(id, updateBoardDto, req.user.id);
    }
}
