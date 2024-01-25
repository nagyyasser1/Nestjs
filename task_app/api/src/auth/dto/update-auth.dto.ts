import { PartialType } from '@nestjs/mapped-types';
import { AuthCredentialsDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(AuthCredentialsDto) {}
