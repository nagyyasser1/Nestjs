/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../enums/task-enums';
import { FilterTaskDto } from '../dto/get-tasks-filter.dto';
import { User } from '../../auth/entities/user.entity';


@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner);
    }

    async createNewTask(createTaskDto: CreateTaskDto, user: User): Promise<Task | undefined> {
        const { title, description } = createTaskDto;

        const new_task = new Task();

        new_task.description = description;
        new_task.title = title;
        new_task.status = TaskStatus.OPEN;
        new_task.user = user;

        await new_task.save();

        delete new_task.user;

        return new_task;
    }

    async getTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
        const { search, status } = filterDto;
        const query = this.createQueryBuilder('task');

        // Remove the join part if you want to exclude the user property
        // query.leftJoinAndSelect('task.user', 'user');

        // Corrected where clause targeting the task entity directly
        query.where('task.user.id = :userId', { userId: user.id });  // Updated to target task entity directly

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        const tasks = await query.getMany();

        return tasks;
    }


}

