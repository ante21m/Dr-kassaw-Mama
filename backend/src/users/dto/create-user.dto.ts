import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const USER_ROLES = ['admin', 'editor', 'viewer'];

export class CreateUserDto {
  @ApiProperty({ example: 'Abc', description: 'Unique username' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password (min 6 chars)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'Full name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com', description: 'Email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+251911234567', description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'admin',
    enum: USER_ROLES,
    description: 'User role',
  })
  @IsOptional()
  @IsIn(USER_ROLES)
  role?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the user can sign in' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
