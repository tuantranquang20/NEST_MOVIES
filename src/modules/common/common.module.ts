import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { CommonController } from './common.controller';
import { CommonService } from './services/common.service';

@Global()
@Module({
  imports: [],
  controllers: [CommonController],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
    CommonService,
  ],
  exports: [ConfigService, CommonService],
})
export class CommonModule {}
