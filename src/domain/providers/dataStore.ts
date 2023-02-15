export namespace DataStoreProviderContract {
  export type getFileInput = { id: string }
  export type getFileOutput = { files: string[] }
  export type saveFileInput = {
    file: Buffer
    fileName: string
    encoding: string
    mimetype: string
  }
  export type saveFileOutput = { id: string }
}

export interface DataStoreProviderContract {
  getFile(
    input: DataStoreProviderContract.getFileInput
  ): Promise<DataStoreProviderContract.getFileOutput>
  saveFile(
    input: DataStoreProviderContract.saveFileInput
  ): Promise<DataStoreProviderContract.saveFileOutput>
}
