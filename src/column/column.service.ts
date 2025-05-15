import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateColumnDto } from "./dto/update-column.dto";

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async createColumn(boardId: string, createColumnDto: CreateColumnDto) {
    if (!createColumnDto) {
      throw new BadRequestException("Column data is required");
    }

    const { name, order } = createColumnDto;

    if (!name || !order) {
      throw new BadRequestException("Name and order are required fields");
    }

    try {
      const column = await this.prisma.column.create({
        data: {
          id: `CL-${Math.floor(100000 + Math.random() * 900000)}`,
          board_id: boardId,
          name,
          order,
        },
      });
      const { ...result } = column;
      return {
        data: result,
        message: "Column created successfully",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(
          "Failed to create column: " + error.message,
        );
      }
      throw error;
    }
  }

  async getColumns(boardId: string){
    try {
      const columns = await this.prisma.column.findMany({
        where: { board_id: boardId },
      });
      return {
        data: columns,
        message: "Success get columns",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(
          "Failed to get columns: " + error.message,
        );
      }
      throw error;
    }
  }

  async deleteColumn(columnId: string){
    try {
        const column = await this.prisma.column.delete({
            where: { id: columnId },
        });
        const { ...result } = column;
        return {
            data: result,
            message: "Column deleted successfully",
            status: "Success",
        };
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            throw new BadRequestException(
                "Failed to delete column: " + error.message,
            );
        }
        throw error;
    }
  }

  async updateColumn(columnId: string, updateColumnDto: UpdateColumnDto) {
    try {
      // First check if column exists
      const existingColumn = await this.prisma.column.findUnique({
        where: { id: columnId },
      });

      if (!existingColumn) {
        throw new NotFoundException(`Column with ID ${columnId} not found`);
      }

      const column = await this.prisma.column.update({
        where: { id: columnId },
        data: updateColumnDto,
      });

      // Remove any sensitive or unnecessary fields
      const { ...result } = column;

      return {
        data: result,
        message: "Column updated successfully",
        status: "Success",
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Column with ID ${columnId} not found`);
        }
        throw new BadRequestException(
          "Failed to update column: " + err.message,
        );
      }
      throw err;
    }
  }
}
