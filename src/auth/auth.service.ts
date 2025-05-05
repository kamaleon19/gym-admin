import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'prisma/prisma.service';
import { CommonService } from 'src/common/common.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.log('AuthService initialized');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.prisma.users.create({
        data: {
          ...userData,
          password: bcrypt.hashSync(password, 10),
        },
      });

      return {
        status: 201,
        message: 'User created successfully',
        data: userData,
      };
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    // Verifica que el email sea correcto
    if (!user) {
      throw new UnauthorizedException('Invalid credentials (email)');
    }

    // Verifica que la contraseña sea correcta
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials (password)');
    }

    return {
      status: 200,
      message: 'Login successful',
      token: this.getJwtToken({
        id: user.id,
        username: user.username,
        rol: user.rol,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
