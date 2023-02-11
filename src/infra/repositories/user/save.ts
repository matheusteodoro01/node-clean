import { SaveUserRepositoryContract } from '@/domain/repositories'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

import { v4 as uuidv4 } from 'uuid'

export class DynamoSaveUserRepository implements SaveUserRepositoryContract {
  constructor(
    private readonly dynamoClient: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

  async execute({
    email,
    name,
    password,
    passwordConfirmation,
    phone
  }: SaveUserRepositoryContract.Input): Promise<SaveUserRepositoryContract.Output> {
    const userId = uuidv4()
    const params = {
      TableName: this.tableName,
      Item: {
        pk: `USER-${userId}`,
        sk: `USER-${userId}`,
        userId,
        email,
        name,
        password,
        passwordConfirmation,
        phone
      }
    }

    await this.dynamoClient.send(new PutCommand(params))

    return params.Item
  }
}
