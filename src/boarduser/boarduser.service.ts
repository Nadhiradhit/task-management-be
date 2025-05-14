import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBoardUserDto } from "./dto/create-board-user.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class BoarduserService {
  constructor(private prisma: PrismaService) {}

  async createUserBoard(userId: string, boardId: string | undefined) {
    if (!boardId) {
      throw new BadRequestException("Board ID is required");
    }

    try {
      const boardUser = await this.prisma.boarduser.create({
        data: {
          board_id: boardId,
          user_id: userId,
        },
      });
      const { ...result } = boardUser;
      return {
        data: result,
        message: "Board User created successfully",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error, "Board User data not found");
      }
      throw error;
    }
  }

  async getBoardUsers(userId: string) {
    try {
      const boardUsers = await this.prisma.boarduser.findMany({
        where: { user_id: userId },
        include: {
          board: {
            select: {
              id: true,
              name: true,
              is_public: true,
              created_at: true,
              updated_at: true,
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return {
        data: boardUsers,
        message: "Success get board users",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error, "Board User data not found");
      }
      throw error;
    }
  }
}
