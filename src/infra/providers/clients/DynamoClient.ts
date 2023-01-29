import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

export class DynamoDBClient {
  private client?: DynamoDBDocumentClient
  get connection() {
    if (!this.client) {
      const dynamo = new DynamoDB({})

      this.client = DynamoDBDocumentClient.from(dynamo, {
        marshallOptions: {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true
        }
      })

    }
    return this.client
  }
}