import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../common/services/config.service';
import { AuthService } from './services/auth.service';
import { JwtGuard } from '../common/jwt.guard';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { RefreshTokenMiddleware } from './auth.middleware';
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.secretAccessTokenKey,
        signOptions: { expiresIn: configService.accessTokenExpiredIn },
      }),
    }),
    CommonModule,
  ],
  providers: [AuthService, JwtGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .forRoutes({ path: '/auth/refresh-token', method: RequestMethod.POST });
  }
}
