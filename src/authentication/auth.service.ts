import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JWTPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async generateRefreshToken(userId): Promise<string> {
    let refreshToken = this.jwtService.sign({ id: userId })
    return refreshToken
  }

  async generateNewToken(id: string) {
      const payload: JWTPayload = {
        sub: id,
      }
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: await this.generateRefreshToken(id),
      };
    }
}
