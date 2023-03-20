import { Module } from '@nestjs/common'
import { infra } from '@/infra/common/ioc'
import {
  DynamoFindUserByIdRepository,
  DynamoSaveCarImageRepository,
  DynamoSaveCarRepository,
  DynamoSaveUserRepository
} from '@/infra/repositories'

import { EnvironmentModule } from './environment.module'
import { ProvidersModule } from './providers.module'

@Module({
  imports: [EnvironmentModule, ProvidersModule],
  providers: [
    {
      provide: infra.repositories.car.save,
      useFactory: (dynamoInstance, tableName) =>
        new DynamoSaveCarRepository(dynamoInstance, tableName),
      inject: [infra.clients.dynamoDb, infra.environment.carTableName]
    },

    {
      provide: infra.repositories.car.saveImage,
      useFactory: (dynamoInstance, tableName) =>
        new DynamoSaveCarImageRepository(dynamoInstance, tableName),
      inject: [infra.clients.dynamoDb, infra.environment.carTableName]
    },
    {
      provide: infra.repositories.user.save,
      useFactory: (dynamoInstance, tableName) =>
        new DynamoSaveUserRepository(dynamoInstance, tableName),
      inject: [infra.clients.dynamoDb, infra.environment.userTableName]
    },
    {
      provide: infra.repositories.user.findById,
      useFactory: (dynamoInstance, tableName) =>
        new DynamoFindUserByIdRepository(dynamoInstance, tableName),
      inject: [infra.clients.dynamoDb, infra.environment.userTableName]
    }
  ],
  exports: [
    infra.repositories.car.save,
    infra.repositories.car.saveImage,
    infra.repositories.user.save,
    infra.repositories.user.findById
  ]
})
export class CarRepositoriesModule {}
