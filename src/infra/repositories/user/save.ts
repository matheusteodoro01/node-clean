import { SaveUserRepositoryContract } from "@/domain/repositories";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb/dist-types/commands";
import { v4 as uuidv4 } from 'uuid';

export class DynamoSaveUserRepository implements SaveUserRepositoryContract {
  constructor(private readonly dynamoClient: DynamoDBDocumentClient, private readonly tableName: string) { }

  async execute({ email, name, password, passwordConfirmation, phone }: SaveUserRepositoryContract.Input): Promise<SaveUserRepositoryContract.Output> {

    const params = {
      TableName: this.tableName,
      Item: {
        email, name, password, passwordConfirmation, phone,
        userId: uuidv4()
      }
    }

    await this.dynamoClient.send(new PutCommand(params))

    return params.Item
  }
}                          