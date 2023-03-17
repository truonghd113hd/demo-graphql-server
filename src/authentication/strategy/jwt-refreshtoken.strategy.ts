import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtService } from '@nestjs/jwt';
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(private jwtService: JwtService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback:true
    });
  }
 
  async validate(req,payload: any) {
    let id = payload.sub;
    let refreshtoken = req?.query?.refresh_token;
    let data: any= this.jwtService.decode(refreshtoken)
    if (!data.id) {
      throw new UnauthorizedException();
    }
    return { _id: payload.sub };
  }
}