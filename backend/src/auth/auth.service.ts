import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OnModuleInit } from '@nestjs/common';
import { User } from './user.entity';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    try {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const existing = await this.userRepository.findOne({
        where: { username },
      });
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!existing) {
        const user = this.userRepository.create({
          username,
          password: hashedPassword,
          name: 'Administrator',
          role: 'admin',
          isActive: true,
        });
        await this.userRepository.save(user);
        console.log(`Default admin user created: username=${username}, password=${password}`);
      } else {
        // Ensure default credentials always work
        existing.password = hashedPassword;
        existing.isActive = true;
        await this.userRepository.save(existing);
        console.log(`Default admin password reset: username=${username}, password=${password}`);
      }
    } catch (e) {
      console.error('Failed to seed default admin user:', e);
    }
  }

  async register(dto: RegisterDto) {
    const existing = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      username: dto.username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.isActive === false) {
      throw new UnauthorizedException('Account is inactive');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username, role: user.role },
    };
  }
}
