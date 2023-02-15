import { Module } from '@nestjs/common'
import { infra } from '@/infra/common/ioc'
import { S3 } from 'aws-sdk'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import {
  EmailValidatorProvider,
  S3DataStoreProvider,
  SQSMessageSenderProvider
} from '@/infra/providers'
import { SQSClient } from '@aws-sdk/client-sqs'
import { EnvironmentModule } from './environment.module'

@Module({
  imports: [EnvironmentModule],
  providers: [
    {
      provide: infra.clients.dynamoDb,
      useFactory: () => DynamoDBDocumentClient.from(new DynamoDB({}))
    },
    {
      provide: infra.clients.s3,
      useFactory: () => new S3({})
    },

    {
      provide: infra.clients.sqsClient,
      useFactory: () => new SQSClient({})
    },
    {
      provide: infra.providers.emailValidator,
      useFactory: () => new EmailValidatorProvider()
    },
    {
      provide: infra.providers.messageSender,
      useFactory: (sqsClient, queue) =>
        new SQSMessageSenderProvider(sqsClient, queue),
      inject: [infra.clients.sqsClient, infra.environment.carQueue]
    },
    {
      provide: infra.providers.dataStore,
      useFactory: (s3Client, bucketName) =>
        new S3DataStoreProvider(s3Client, bucketName),
      inject: [infra.clients.s3, infra.environment.carBucket]
    }
  ],
  exports: [
    infra.clients.dynamoDb,
    infra.clients.s3,
    infra.clients.sqsClient,
    infra.providers.emailValidator,
    infra.providers.messageSender,
    infra.providers.dataStore
  ]
})
export class ProvidersModule {}
