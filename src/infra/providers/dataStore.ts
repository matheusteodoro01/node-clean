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
    const key = `${uuidv4()}.${fileName.split('.').at(-1)}`
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: mimetype,
      ContentEncoding: encoding,
      ACL: 'public-read'
    }
    const { Key } = await this.s3Client.upload(params).promise()

    return { id: Key }
  }
}
