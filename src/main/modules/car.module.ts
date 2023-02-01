import { Module } from '@nestjs/common';
import { domain } from '@/domain/common/ioc';
import { infra } from '@/infra/common/ioc';

import { EnvironmentModule } from './environment.module';

import {
    CreateCarUsecase,
    CreateUserUsecase,
    GetCarUsecase,
    ProcessCarUsecase
} from '@/domain/usecases';
import {
    CreateUserController
} from '@/infra/controllers';
import { ProvidersModule } from './providers.module';
import { CarRepositoriesModule } from './car.repositories.module';

@Module({
    imports: [
        EnvironmentModule.forRoot(),
        CarRepositoriesModule,
        ProvidersModule
    ],
    providers: [
        {
            provide: domain.usecases.user.create,
            useFactory: (saveUserRepository,emailValidatorProvider): CreateUserUsecase =>
                new CreateUserUsecase(saveUserRepository,emailValidatorProvider),
            inject: [infra.repositories.user.save]
        },
       
    ],
})
export class CarModule { }
