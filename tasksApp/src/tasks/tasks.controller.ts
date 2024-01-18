import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { User } from './../auth/entities/user.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './enums/task-enums';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() taskData: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task | null> {
    return this.tasksService.create(taskData, user);
  }

  @Get()
  getAll(
    @Query() filterDto: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[] | null> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task | null> {
    return this.tasksService.getTaskById(id, user);
  }

  @Patch(':id')
  upatedTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task | null> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<string> {
    return this.tasksService.deleteTaskById(id, user);
  }
}
