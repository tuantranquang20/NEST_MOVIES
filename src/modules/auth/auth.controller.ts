import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { User } from 'src/db/models/user.entity';
import {
  makeErrorResponse,
  makeSuccessResponse,
} from '../common/classes/api.response';
import { GoogleLoginLinkDto } from './dto/requests/google-login-link.dto';
import { GoogleLoginDto } from './dto/requests/google-login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google-login-link')
  // @UsePipes(new JoiValidationPipe(GoogleLoginLinkSchema))
  async getGoogleLoginLink(@Query() query: GoogleLoginLinkDto) {
    try {
      const link = this.authService.getGoogleLink(query);
      return makeSuccessResponse({
        link: link,
        redirectUri: query.redirectUri,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Post('google-login')
  // @UsePipes(new JoiValidationPipe(GoogleLoginSchema))
  public async loginWithGoogle(@Body() data: GoogleLoginDto) {
    try {
      const { code = null, redirectUri = null } = data;
      const decodedCode = decodeURIComponent(code);
      const googleAccessToken = await this.authService.getAccessTokenFromCode(
        decodedCode,
        redirectUri,
      );
      if (!googleAccessToken) {
        return makeErrorResponse(
          HttpStatus.BAD_REQUEST,
          'Error access token',
          [],
        );
      }
      const resultToken = await this.authService.getUserInfoFromAccessToken(
        googleAccessToken,
      );
      if (!resultToken?.email) {
        return makeErrorResponse(HttpStatus.BAD_REQUEST, 'Not found email', []);
      } else {
        // TODO: check email, if exist => login, else insert then login
        // const {
        //   user: profile,
        //   accessToken,
        //   refreshToken,
        // } = await this.authService.login({
        //   email: 'tuantranquang20@gmail.com',
        // } as User);
        // return makeSuccessResponse({ profile, accessToken, refreshToken });
      }
      // const user = await this.authService.findUserByEmail(userInfoEmail);
      // // check if user exists?
      // if (!user) {
      //   return makeErrorResponse(HttpStatus.BAD_REQUEST, 'User not found', []);
      // }
    } catch (error) {
      console.log(error, 'error');
      throw new InternalServerErrorException(error);
    }
  }
  @Post('loginManual')
  async loginManual(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.findUserByEmail(body.email);
      if (user.password) {
        const isCorrectPassword = await user.validatePassword(body.password);
        if (!isCorrectPassword) {
          return makeErrorResponse(
            HttpStatus.BAD_REQUEST,
            'Khong tim thay tai khoan',
            [],
          );
        }
      }
      const {
        user: profile,
        accessToken,
        refreshToken,
      } = await this.authService.loginManual(user);
      return makeSuccessResponse({ profile, accessToken, refreshToken });
    } catch (error) {
      throw error;
    }
  }
  @Post('signUp')
  async signUp(@Body() body: { email: string; password: string }) {
    try {
      const result = await this.authService.signUp(body);
      return result;
    } catch (error) {
      throw error;
    }
  }
  @Post('logout')
  async logout(@Request() req) {
    try {
      const result = await this.authService.logout(req.user);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
