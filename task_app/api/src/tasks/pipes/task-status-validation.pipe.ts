/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../enums/task-enums';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly  allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ]

  transform(value: any) {
   
    if(!this.isStatusValid(value)) throw new BadRequestException(`invalid status! you provide ${value} `);

    return value;
  }

  isStatusValid(status: any){
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
