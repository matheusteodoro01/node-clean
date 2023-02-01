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
          provide: infra.environment.bucket,
          useValue:  process.env['BUCKET']
        },
        {
          provide: infra.environment.carTableName,
          useValue:  process.env['CAR_TABLE']
        },
        {
          provide: infra.environment.logLevel,
          useValue: process.env['LOG_LEVEL']
        }
      ],
      exports: [
        infra.environment.bucket,
        infra.environment.carTableName,
        infra.environment.logLevel
      ]
    }
  }
}
