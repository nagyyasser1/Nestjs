import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+\-=\[\]{};':\\\/<>,.?~`])(?=.{8,}$)/,
    {
      message:
        'Password must contain at least one uppercase, one lowercase, one digit, one special character, and be at least 8 characters long.',
    },
  )
  password: string;
}
