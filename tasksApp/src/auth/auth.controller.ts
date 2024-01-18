import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Cookies } from './decorators/get-cookies-decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() createAuthDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(createAuthDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() createAuthDto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(createAuthDto, res);
  }

  @Get('refresh')
  refresh(@Cookies('jwt') jwt: string) {
    return this.authService.refresh(jwt);
  }

  @Post('logout')
  logOut(@Res() res: Response, @Cookies('jwt') jwt: string) {
    if (!jwt) throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    return this.authService.logOut(res);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
