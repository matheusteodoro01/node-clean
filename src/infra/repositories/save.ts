import { SaveCarRepositoryContract } from "@/domain/repositories";
import { DynamoDBClient } from "@/infra/providers/clients/DynamoClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb/dist-types/commands";
import { v4 as uuidv4 } from 'uuid';

export class DynamoSaveCarRepository implements SaveCarRepositoryContract {
  constructor(private readonly dynamoClient: DynamoDBClient, private readonly tableName: string) { }

  async execute({ car, userId }: SaveCarRepositoryContract.Input): Promise<SaveCarRepositoryContract.Output> {

    const params = {
      TableName: this.tableName,
      Item: {
        ...car,
        userId,
        carId: uuidv4()
      }
    }

    await this.dynamoClient.connection.send(new PutCommand({
      TableName: this.tableName,
      Item: {
        ...car,
        carId: uuidv4()
      }
    }))
    return params.Item
  }
}                          