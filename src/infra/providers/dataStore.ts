import { DataStoreProviderContract } from "@/domain/providers";

export class S3DataStoreProvider {
  constructor() { }
  async getFile(input: DataStoreProviderContract.getFileInput): Promise<DataStoreProviderContract.getFileOutput> {
    return Promise.resolve({ files: [] })
  }
  async saveFile(input: DataStoreProviderContract.saveFileInput): Promise<DataStoreProviderContract.saveFileOutput> { 
    return Promise.resolve({ id:'' })
  }
}