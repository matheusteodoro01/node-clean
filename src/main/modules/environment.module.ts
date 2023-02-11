import { Module, DynamicModule, Global } from '@nestjs/common'
import { infra } from '@/infra/common/ioc'

@Global()
@Module({})
export class EnvironmentModule {
  static forRoot(): DynamicModule {
    return {
      module: EnvironmentModule,
      providers: [
        {
          provide: infra.environment.carBucket,
          useValue: process.env['CAR_IMAGES_BUCKET']
        },
        {
          provide: infra.environment.carTableName,
          useValue: process.env['CAR_TABLE']
        },
        {
          provide: infra.environment.carQueue,
          useValue: process.env['CAR_QUEUE']
        },
        {
          provide: infra.environment.userTableName,
          useValue: process.env['USER_TABLE']
        },
        {
          provide: infra.environment.logLevel,
          useValue: process.env['LOG_LEVEL']
        }
      ],
      exports: [
        infra.environment.carBucket,
        infra.environment.carTableName,
        infra.environment.carQueue,
        infra.environment.userTableName,
        infra.environment.logLevel
      ]
    }
  }
}
