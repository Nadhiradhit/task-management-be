import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @Body('columnId') columnId: string) {
        return this.taskService.createTask(columnId, createTaskDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':columnId')
    getTask(@Param('columnId') columnId: string) {
        return this.taskService.getTask(columnId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getTasks(@Request() req) {
        return this.taskService.getTask(req.user.id);
    }
    
}
