/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/task-enums';

export class FilterTaskDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE,TaskStatus.OPEN,TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
