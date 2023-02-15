import { Module } from '@nestjs/common'
import { domain } from '@/domain/common/ioc'
import { infra } from '@/infra/common/ioc'

import { EnvironmentModule } from './environment.module'

import {
  CreateCarUsecase,
  CreateUserUsecase,
  GetCarUsecase,
  ProcessCarUsecase,
  UploadCarImageUsecase
} from '@/domain/usecases'
import {
  CreateCarController,
  CreateUserController,
  UploadCarImageController
} from '@/infra/controllers'
import { ProvidersModule } from './providers.module'
import { CarRepositoriesModule } from './car.repositories.module'

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    ProvidersModule,
    CarRepositoriesModule
  ],
  providers: [
    {
      provide: domain.usecases.user.create,
      useFactory: (saveUserRepository, emailValidatorProvider) =>
        new CreateUserUsecase(saveUserRepository, emailValidatorProvider),
      inject: [infra.repositories.user.save, infra.providers.emailValidator]
    },
    {
      provide: domain.usecases.car.create,
      useFactory: (getUserRepository, messageSenderProvider) =>
        new CreateCarUsecase(getUserRepository, messageSenderProvider),
      inject: [infra.repositories.user.findById, infra.providers.messageSender]
    },
    {
      provide: domain.usecases.car.uploadFile,
      useFactory: (dataStoreProvider) =>
        new UploadCarImageUsecase(dataStoreProvider),
      inject: [infra.providers.dataStore]
    }
  ],
  controllers: [
    CreateUserController,
    CreateCarController,
    UploadCarImageController
  ]
})
export class CarModule {}
