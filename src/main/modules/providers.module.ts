import { Module } from '@nestjs/common'
import { infra } from '@/infra/common/ioc'
import { S3Client } from '@aws-sdk/client-s3'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import {
  EmailValidatorProvider,
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
      useFactory: () => new S3Client({})
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
    }
  ],
  exports: [
    infra.clients.dynamoDb,
    infra.clients.s3,
    infra.clients.sqsClient,
    infra.providers.emailValidator,
    infra.providers.messageSender
  ]
})
export class ProvidersModule {}
