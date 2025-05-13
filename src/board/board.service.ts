import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async createBoard(userId: string, createBoardDto: CreateBoardDto) {
    const { name, is_public } = createBoardDto;
    try {
      const board = await this.prisma.board.create({
        data: {
          id: `BD-${Math.floor(100000 + Math.random() * 900000)}`,
          name,
          is_public,
          created_by: userId,
        },
      });
      const {...result } = board;
      return {
        data: result,
        message: "Board created successfully",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
       console.log(error, "Board data not found");
      }
      throw error;
    }
  }

  async getBoards(userId: string) {
    try{
      const board = await this.prisma.board.findMany({
        where: {
          OR: [{ created_by: userId }, { is_public: true }],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      const {...result } = board;
      return {
        data: result,
        message: "Success get all boards",
        status: "Success",
      };
    }catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
       console.log(error, "Board data not found");
      }
      throw error;
    }
    
  }

  async getBoardById(id: string) {
    try{
      const board = await this.prisma.board.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      const {...result } = board;
      return {
        data: result,
        message: "Success get board by id",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
       console.log(error, "Board data not found");
      }
      throw error;
    }
  }

  async deleteBoard(id: string) {
    try{
      const board = await this.prisma.board.delete({
        where: { id },
      });
      const {...result } = board;
      return {
        data: result,
        message: "Board deleted successfully",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
       console.log(error, "Board data not found");
      }
      throw error;
    }
  }
}
