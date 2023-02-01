import { Module } from '@nestjs/common'
import { infra } from '@/infra/common/ioc'
import { EnvironmentModule } from './environment.module'
import { S3Client } from '@aws-sdk/client-s3'
import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

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
    }
  ],
  exports: [infra.providers.dataStore]
})
export class ProvidersModule { }
