import { SaveCarRepositoryContract } from "@/domain/repositories";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb/dist-types/commands";
import { v4 as uuidv4 } from 'uuid';

export class DynamoSaveCarRepository implements SaveCarRepositoryContract {
  constructor(private readonly dynamoClient: DynamoDBDocumentClient, private readonly tableName: string) { }

  async execute({ car, userId }: SaveCarRepositoryContract.Input): Promise<SaveCarRepositoryContract.Output> {

    const params = {
      TableName: this.tableName,
      Item: {
        ...car,
        userId,
        carId: uuidv4()
      }
    }

    await this.dynamoClient.send(new PutCommand(params))
    return params.Item
  }
}                          