import { Controller, Post, Get, UseGuards, Request, Body } from "@nestjs/common";
import { BoarduserService } from "./boarduser.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateBoardUserDto } from "./dto/create-board-user.dto";

@Controller("boarduser")
export class BoarduserController {
  constructor(private readonly boarduserService: BoarduserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createBoardUserDto: CreateBoardUserDto) {
    return this.boarduserService.createUserBoard(
      req.user.id,
      createBoardUserDto.board_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getBoardUsers(@Request() req) {
    return this.boarduserService.getBoardUsers(req.user.id);
  }
}
