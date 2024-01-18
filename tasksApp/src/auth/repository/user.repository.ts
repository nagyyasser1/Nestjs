import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/create-auth.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;

    const user = new User();

    user.username = username;
    await user.setPassword(password);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already existed!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto,
  ): Promise<string | null> {
    const { username, password } = authCredentials;
    const user = await this.findOne({ where: { username } });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
