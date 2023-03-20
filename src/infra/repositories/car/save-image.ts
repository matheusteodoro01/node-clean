import { SaveCarImageRepositoryContract } from '@/domain/repositories'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

export class DynamoSaveCarImageRepository
  implements SaveCarImageRepositoryContract
{
  constructor(
    private readonly dynamoClient: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

  async execute({
    carId,
    imageId
  }: SaveCarImageRepositoryContract.Input): Promise<SaveCarImageRepositoryContract.Output> {
    const params = {
      TableName: this.tableName,
      Item: {
        carId,
        imageId,
        pk: `CAR-${carId}`,
        sk: `IMAGE-${imageId}`
      }
    }

    await this.dynamoClient.send(new PutCommand(params))
  }
}
