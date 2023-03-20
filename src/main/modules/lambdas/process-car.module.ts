import { Module } from '@nestjs/common'
import { domain } from '@/domain/common/ioc'
import { infra } from '@/infra/common/ioc'
import { EnvironmentModule } from '@/main/modules/environment.module'
import { ProcessCarUsecase } from '@/domain/usecases'
import { ProvidersModule } from '@/main/modules/providers.module'
import { CarRepositoriesModule } from '@/main/modules/car.repositories.module'

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    ProvidersModule,
    CarRepositoriesModule
  ],
  providers: [
    {
      provide: domain.usecases.car.process,
      useFactory: (saveCarRepository, saveCarImageRepository) =>
        new ProcessCarUsecase(saveCarRepository, saveCarImageRepository),
      inject: [infra.repositories.car.save, infra.repositories.car.saveImage]
    }
  ]
})
export class ProccessCarModule {}
