import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refreshtoken.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expired },
    }),
  ],
  providers: [AuthService, JwtRefreshTokenStrategy, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
