import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: UserRole.USER,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } });
    return { user: this.excludePassword(user), ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken, lastLogin: new Date() } });
    return { user: this.excludePassword(user), ...tokens };
  }

  async refreshTokens(refreshToken: string) {
    const user = await this.prisma.user.findFirst({ where: { refreshToken } });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } });
    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
    return { success: true };
  }

  async generateTokens(userId: string, email: string, role: UserRole) {
    const payload = { sub: userId, email, role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET'), expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }

  private excludePassword(user: any) {
    const { password, ...result } = user;
    return result;
  }
}
