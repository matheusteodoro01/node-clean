import { DataStoreProviderContract } from '@/domain/providers'
import { S3 } from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
export class S3DataStoreProvider {
  constructor(
    private readonly s3Client: S3,
    private readonly bucketName: string
  ) {}
  async getFile(
    input: DataStoreProviderContract.getFileInput
  ): Promise<DataStoreProviderContract.getFileOutput> {
    return Promise.resolve({ files: [] })
  }
  async saveFile({
    file,
    fileName,
    encoding,
    mimetype
  }: DataStoreProviderContract.saveFileInput): Promise<DataStoreProviderContract.saveFileOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: uuidv4(),
      Body: file,
      ContentType: mimetype,
      ContentEncoding: encoding
    }

    const { Key } = await this.s3Client.upload(params).promise()

    return { id: Key }
  }
}
