import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'postgres',
  username: 'postgres',
  entities: [Task, User],
  database: 'taskmanagement',
  synchronize: true,
  logging: false,
};
