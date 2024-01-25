import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterTaskDto } from './dto/get-tasks-filter.dto';
import { User } from './../auth/entities/user.entity';
import { TaskStatus } from './enums/task-enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task | null> {
    return this.tasksRepository.createNewTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task | null> {
    const task = await this.tasksRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!task) throw new NotFoundException(`task with id:${id} not found`);
    return task;
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task | null> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async updateTask(id: number, data: Task, user: User): Promise<Task | null> {
    const task = await this.getTaskById(id, user);
    task.title = data.title || task.title;
    task.description = data.description || task.description;
    await task.save();
    return task;
  }

  async deleteTaskById(id: number, user: User): Promise<string | null> {
    const result = await this.tasksRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`task with id:${id} not found`);
    }
    return `task with id:${id} deleted successfully.`;
  }
}
