import { SaveUserRepositoryContract } from "@/domain/repositories";
import { DynamoDBClient } from "@/infra/providers/clients/dynamoClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb/dist-types/commands";
import { v4 as uuidv4 } from 'uuid';

export class DynamoSaveUserRepository implements SaveUserRepositoryContract {
  constructor(private readonly dynamoClient: DynamoDBClient, private readonly tableName: string) { }

  async execute({ email, name, password, passwordConfirmation, phone }: SaveUserRepositoryContract.Input): Promise<SaveUserRepositoryContract.Output> {

    const params = {
      TableName: this.tableName,
      Item: {
        email, name, password, passwordConfirmation, phone,
        userId: uuidv4()
      }
    }

    await this.dynamoClient.connection.send(new PutCommand(params))

    return params.Item
  }
}                          