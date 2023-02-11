import { FindUserByIdRepositoryContract } from '@/domain/repositories'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

export class DynamoFindUserByIdRepository
  implements FindUserByIdRepositoryContract
{
  constructor(
    private readonly dynamoClient: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

  async execute({
    userId
  }: FindUserByIdRepositoryContract.Input): Promise<FindUserByIdRepositoryContract.Output> {
    const params = {
      TableName: this.tableName,
      Key: {
        pk: `USER-${userId}`,
        sk: `USER-${userId}`
      }
    }

    const { Item } = await this.dynamoClient.send(new GetCommand(params))

    return Item as FindUserByIdRepositoryContract.Output
  }
}
