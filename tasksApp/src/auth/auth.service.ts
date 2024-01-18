import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto, res: Response) {
    const username =
      await this.usersRepository.validateUserPassword(authCredentials);

    if (!username) {
      throw new UnauthorizedException('invalid credentilas!');
    }

    const accessToken = this.createJwtAccessToken(username, '1h');
    const refreshToken = this.createJwtRefreshToken(username, '7d');

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({ accessToken });
  }

  async refresh(jwt: string) {
    if (!jwt) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const decodedToken = this.jwtService.verify(jwt, {
        secret: process.env.JWT_REFRESH_SEC,
      });

      const { username } = decodedToken;
      const newAccessToken = this.createJwtAccessToken(username, '1h');

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async logOut(res: Response) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(HttpStatus.OK);
    res.json({ message: 'Cookie cleared' });
  }

  createJwtAccessToken(payload: string, expiresIn: string): string {
    return this.jwtService.sign(
      { payload },
      { expiresIn, secret: process.env.JWT_ACCESS_SEC },
    );
  }

  createJwtRefreshToken(payload: string, expiresIn: string): string {
    return this.jwtService.sign(
      { payload },
      { expiresIn, secret: process.env.JWT_REFRESH_SEC },
    );
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    console.log(updateAuthDto);
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
