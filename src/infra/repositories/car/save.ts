import { SaveCarRepositoryContract } from '@/domain/repositories'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

export class DynamoSaveCarRepository implements SaveCarRepositoryContract {
  constructor(
    private readonly dynamoClient: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

  async execute(
    input: SaveCarRepositoryContract.Input
  ): Promise<SaveCarRepositoryContract.Output> {
    const carId = uuidv4()
    const params = {
      TableName: this.tableName,
      Item: {
        ...input,
        carId,
        pk: `USER-${input.userId}`,
        sk: `CAR-${carId}`
      }
    }

    await this.dynamoClient.send(new PutCommand(params))
    return params.Item
  }
}
