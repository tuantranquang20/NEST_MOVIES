import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { JwtService } from '@nestjs/jwt';
import { AUTHORIZATION_TYPE } from '../auth/auth.constant';
import { extractToken } from './common.function';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractToken(request.headers.authorization || '');
    if (!token) {
      throw new UnauthorizedException();
    }

    request.loginUser = await this.validateToken(
      token,
      request.authorizationType === AUTHORIZATION_TYPE,
    );

    return true;
  }

  async validateToken(token: string, isRefreshToken = false) {
    try {
      if (isRefreshToken) {
        return await this.jwtService.verify(token, {
          secret: this.configService.secretRefreshTokenKey,
          ignoreExpiration: false,
        });
      } else {
        return await this.jwtService.verify(token, {
          secret: this.configService.secretAccessTokenKey,
          ignoreExpiration: false,
        });
      }
    } catch (error) {
      const message = 'Token Error: ' + (error.message || error.name);
      throw new ForbiddenException({ message: message });
    }
  }
}
