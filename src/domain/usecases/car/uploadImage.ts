import { DataStoreProviderContract } from '@/domain/providers'

export namespace UploadCarImageUsecase {
  export type Input = {
    buffer: Buffer
    originalname: string
    encoding: string
    mimetype: string
  }

  export type Output = { id: string }
}

export class UploadCarImageUsecase {
  constructor(private readonly dataStoreProvider: DataStoreProviderContract) {}

  async execute({
    buffer,
    originalname,
    encoding,
    mimetype
  }: UploadCarImageUsecase.Input): Promise<UploadCarImageUsecase.Output> {
    return await this.dataStoreProvider.saveFile({
      file: buffer,
      fileName: originalname,
      encoding,
      mimetype
    })
  }
}
