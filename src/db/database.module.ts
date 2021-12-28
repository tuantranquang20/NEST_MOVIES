import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Connection, FileLogger, getConnection } from 'typeorm';

import { CommonModule } from '../modules/common/common.module';
import { ConfigService } from '../modules/common/services/config.service';

@Global()
@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database, socketPath } =
          configService.db;
        const options: TypeOrmModuleOptions = {
          name: 'default',
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          logger: new FileLogger(configService.isDevelopment, {
            logPath: 'logs/query.log',
          }),
          synchronize: true,
        };
        if (socketPath) {
          Object.assign(options, { socketPath });
        }
        return options;
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  constructor(private serviceConfig: ConfigService) {}
  public async runMigrations() {
    const connection: Connection = await getConnection();
    return connection.runMigrations();
  }
}
