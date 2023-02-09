import { Module } from '@nestjs/common'
import { infra } from '@/infra/common/ioc'
import { S3Client } from '@aws-sdk/client-s3'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { EmailValidatorProvider } from '@/infra/providers'

@Module({
  providers: [
    {
      provide: infra.clients.dynamoDb,
      useFactory: () => DynamoDBDocumentClient.from(new DynamoDB({})),
    },
    {
      provide: infra.clients.s3,
      useFactory: () => new S3Client({}),
    },
    {
      provide: infra.providers.emailValidator,
      useFactory: () => new EmailValidatorProvider(),
    },
  ],
  exports: [
    infra.clients.dynamoDb,
    infra.clients.s3,
    infra.providers.emailValidator,
  ],
})
export class ProvidersModule {}
