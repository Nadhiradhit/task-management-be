import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async createTask(columnId: string, createTaskDto:CreateTaskDto) {
        if(!createTaskDto) {
            throw new BadRequestException('Task data is required');
        }

        const { title, description, assigned_to } = createTaskDto;

        if(!title || !description || !assigned_to) {
            throw new BadRequestException('Title, description and assigned_to are required fields');
        }

        try{
            const task = await this.prisma.task.create({
                data: {
                    id: `TSK-${Math.floor(100000 + Math.random() * 900000)}`,
                    column_id: columnId,
                    title,
                    description,
                    assigned_to
                },
            });
            const {...result }  = task;
            return{
                data: result,
                message: "Task created successfully",
                status: "Success",
            }
        }catch (error){
            if (error instanceof PrismaClientKnownRequestError) {
                    throw new BadRequestException(
                    "Failed to create column: " + error.message,
                    );
                }
                throw error;
        }
    }

    async getTask(columnId: string){
        try{
            const task = await this.prisma.task.findMany({
                where: { column_id: columnId },
            });
            return {
                data: task,
                message: "Success get task",
                status: "Success",
            };
        }catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(
          "Failed to get columns: " + error.message,
        );
      }
      throw error;
    }
    }
}
