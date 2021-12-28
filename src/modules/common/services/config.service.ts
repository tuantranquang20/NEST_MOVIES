import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import DatabaseConfig from '../../../../database/config';
import { pick } from 'lodash';
dotenv.config();
export interface EnvConfig {
  [key: string]: string;
}

export interface DBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  socketPath?: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly validationSchema = {
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().default(3000),
    BASE_PATH: Joi.string().default('/api/v1/').empty(''),

    LOG_LEVEL: Joi.string().default('debug'),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().optional().allow(null, ''),
    DB_NAME: Joi.string().required(),
    DB_SOCKET: Joi.string().optional().allow(null, ''),

    JWT_SECRET_ACCESS_TOKEN_KEY: Joi.string().default('s@cret'),
    JWT_SECRET_REFRESH_TOKEN_KEY: Joi.string().default('s@cret'),
    TOKEN_EXPIRED_IN: Joi.number().default(86400).required(),
    REFRESH_TOKEN_EXPIRED_IN: Joi.number().default(86400).required(),

    APP_DOMAIN: Joi.string().default('http://localhost:3000'),
    CORS: Joi.string().default('*'),

    GOOGLE_CLIENT_ID: Joi.string().required().default(''),
    GOOGLE_CLIENT_SECRET: Joi.string().required().default(''),
  };

  constructor() {
    const env = process.env;
    const configEnv = pick(env, Object.keys(this.validationSchema));
    this.envConfig = this.validateInput(configEnv);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }
  get basePath(): string {
    return String(this.envConfig.BASE_PATH);
  }
  get secretAccessTokenKey(): string {
    return String(this.envConfig.JWT_SECRET_ACCESS_TOKEN_KEY);
  }
  get accessTokenExpiredIn(): number {
    return Number(this.envConfig.TOKEN_EXPIRED_IN);
  }
  get secretRefreshTokenKey(): string {
    return String(this.envConfig.JWT_SECRET_REFRESH_TOKEN_KEY);
  }
  get refreshTokenExpiredIn(): number {
    return Number(this.envConfig.REFRESH_TOKEN_EXPIRED_IN);
  }
  get logLevel(): string {
    return String(this.envConfig.LOG_LEVEL);
  }

  get db(): DBConfig {
    const mysqlDatabase = DatabaseConfig.find((item) => item.type === 'mysql');
    const { database, port, username, password, host, socketPath } =
      mysqlDatabase;
    return {
      database,
      port,
      username,
      password,
      host,
      socketPath: socketPath || null,
    };
  }

  get environment() {
    return String(this.envConfig.NODE_ENV);
  }
  get isDevelopment() {
    return String(this.envConfig.NODE_ENV) === 'development';
  }
  get isProduction() {
    return String(this.envConfig.NODE_ENV) === 'production';
  }

  get googleConfig() {
    return {
      clientId: String(this.envConfig.GOOGLE_CLIENT_ID),
      clientSecret: String(this.envConfig.GOOGLE_CLIENT_SECRET),
    };
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationSchema);

    const result = envVarsSchema.validate(envConfig);
    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }

    return result.value;
  }

  get domain(): string {
    return String(this.envConfig.APP_DOMAIN);
  }
  get cors(): string {
    return String(this.envConfig.CORS);
  }
}
