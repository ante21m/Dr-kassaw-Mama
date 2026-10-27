import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/** Columns that are safe to expose through the API (never the password hash). */
const PUBLIC_USER_SELECT: FindOptionsSelect<User> = {
  id: true,
  username: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({
      select: PUBLIC_USER_SELECT,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: PUBLIC_USER_SELECT,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const clash = await this.userRepository.findOne({
      where: [
        { username: dto.username },
        ...(dto.email ? [{ email: dto.email }] : []),
      ],
    });
    if (clash) {
      throw new ConflictException('Username or email already exists');
    }

    const user = this.userRepository.create({
      username: dto.username,
      password: await bcrypt.hash(dto.password, 10),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      role: dto.role ?? 'admin',
      isActive: dto.isActive ?? true,
    });

    const saved = await this.userRepository.save(user);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.username && dto.username !== user.username) {
      const exists = await this.userRepository.findOne({
        where: { username: dto.username },
      });
      if (exists && exists.id !== id) {
        throw new ConflictException('Username already exists');
      }
      user.username = dto.username;
    }

    if (dto.email && dto.email !== user.email) {
      const exists = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (exists && exists.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.name !== undefined) user.name = dto.name;
    if (dto.email !== undefined) user.email = dto.email;
    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.role !== undefined) user.role = dto.role;
    if (dto.isActive !== undefined) user.isActive = dto.isActive;

    await this.userRepository.save(user);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return { success: true };
  }
}
