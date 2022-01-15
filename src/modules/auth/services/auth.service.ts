import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateHashToken } from '../../common/common.function';
import { User } from '../../../db/models/user.entity';
import { UserToken } from '../../../db/models/user-token.entity';
import { ConfigService } from '../../common/services/config.service';
import { IGoogleLoginLinkQuery } from '../auth.interface';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginLinkParameters, GoogleUserInfoUrl } from '../auth.constant';
import { CommonService } from 'src/modules/common/services/common.service';
import axios from 'axios';

export const usersAttributes: (keyof User)[] = ['id', 'email'];

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly dbManager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {}
  private generateAccessToken(user: User) {
    const { accessTokenExpiredIn, secretAccessTokenKey } = this.configService;
    const accessTokenOptions = {
      secret: secretAccessTokenKey,
      expiresIn: accessTokenExpiredIn,
    };
    const payloadAccessToken = {
      id: user.id,
      email: user.email,
      expiresIn: accessTokenExpiredIn,
    };
    const accessToken = this.jwtService.sign(
      payloadAccessToken,
      accessTokenOptions,
    );
    return {
      token: accessToken,
      expiresIn: accessTokenExpiredIn,
    };
  }
  /**
   *
   * @param user
   * @param hashToken
   * @return refreshToken && refreshTokenExpiredIn
   */
  private generateRefreshToken(user: User, hashToken: string) {
    const { refreshTokenExpiredIn, secretRefreshTokenKey } = this.configService;
    const accessTokenOptions = {
      secret: secretRefreshTokenKey,
      expiresIn: refreshTokenExpiredIn,
    };

    const payloadAccessToken = {
      id: user.id,
      email: user.email,
      expiresIn: refreshTokenExpiredIn,
      hashToken,
    };
    const refreshToken = this.jwtService.sign(
      payloadAccessToken,
      accessTokenOptions,
    );
    return {
      token: refreshToken,
      expiresIn: refreshTokenExpiredIn,
    };
  }

  public getGoogleLink(
    query: IGoogleLoginLinkQuery,
    scope = GoogleLoginLinkParameters.scope,
    responseType = GoogleLoginLinkParameters.responseType,
    accessType = GoogleLoginLinkParameters.accessType,
    prompt = GoogleLoginLinkParameters.prompt,
  ) {
    try {
      const { clientSecret, clientId } = this.configService.googleConfig;

      const googleClient = new OAuth2Client({ clientSecret, clientId });
      const googleLoginUrl = googleClient.generateAuthUrl({
        state: query.state,
        redirect_uri: query.redirectUri,
        scope,
        response_type: responseType,
        access_type: accessType,
        prompt,
      });
      return googleLoginUrl;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async getAccessTokenFromCode(
    decodedCode: string,
    redirectUri: string,
  ) {
    try {
      const { clientSecret, clientId } = this.configService.googleConfig;
      const googleClient = new OAuth2Client({ clientSecret, clientId });
      const result = await googleClient.getToken({
        code: decodedCode,
        redirect_uri: redirectUri,
      });
      return result?.tokens?.access_token || '';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async getUserInfoFromAccessToken(access_token) {
    try {
      const { clientSecret, clientId } = this.configService.googleConfig;

      const googleClient = new OAuth2Client({ clientSecret, clientId });
      const result = await googleClient.getTokenInfo(access_token);
      const resultAxios = await axios
        .create({
          baseURL: 'https://www.googleapis.com/oauth2/v2',
          timeout: 30000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .get(`/userinfo?alt=json&access_token=${access_token}`);
      console.log(resultAxios, 'resultAxios');
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async findUserByEmail(email: string, attributes = usersAttributes) {
    try {
      const user = await this.dbManager.findOne(User, {
        select: attributes,
        where: { email },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  public async login(user: User) {
    try {
      const accessToken = this.generateAccessToken(user);
      const hashToken = generateHashToken(user.id);
      const refreshToken = this.generateRefreshToken(user, hashToken);
      await this.dbManager.transaction(async (transactionManager) => {
        // add refresh token to user_tokens table.
        await transactionManager.save(UserToken, {
          user,
          token: refreshToken.token,
          hashToken,
        });
        // update lastLoginAt for user
        await transactionManager.update(
          User,
          { id: user.id },
          { lastLoginAt: new Date() },
        );
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
