import { ConflictException, Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateBoardDto } from "./dto/update-board.dto";
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

  async updateBoard(boardId: string, updateBoardDto: UpdateBoardDto, userId: string) {
    
    const existingBoard = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!existingBoard) {
      throw new NotFoundException('Board not found');
    }

  
    if (existingBoard.created_by !== userId) {
      throw new ForbiddenException('You do not have permission to update this board');
    }

    
    const updateData: any = {};
    if (typeof updateBoardDto.name === 'string' && updateBoardDto.name.trim() !== '') {
      updateData.name = updateBoardDto.name.trim();
    }
    if (typeof updateBoardDto.is_public === 'boolean') {
      updateData.is_public = updateBoardDto.is_public;
    }

    
    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No valid update data provided');
    }

    
    const updatedBoard = await this.prisma.board.update({
      where: { id: boardId },
      data: {
        id: boardId,
        name: updateData.name ?? undefined,
        is_public: updateData.is_public ?? undefined,
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

    return {
      data: updatedBoard,
      message: "Board updated successfully",
      status: "Success",
    };
  }
}
