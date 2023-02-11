import { Car } from '@/domain/models/car'
import {
  SaveCarRepositoryContract,
  SaveCarImageRepositoryContract
} from '@/domain/repositories'
import { DataStoreProviderContract } from '@/domain/providers'

export namespace ProcessCarUsecase {
  export type Input = Omit<Car, 'carId'>

  export type Output = void
}

export class ProcessCarUsecase {
  constructor(
    private readonly saveCarRepository: SaveCarRepositoryContract,
    private readonly dataStoreProvider: DataStoreProviderContract,
    private readonly saveCarImageRepository: SaveCarImageRepositoryContract
  ) {}

  async execute(
    input: ProcessCarUsecase.Input
  ): Promise<ProcessCarUsecase.Output> {
    const carSave = await this.saveCarRepository.execute(input)
    if (input.images) {
      const promises = input?.images.map(async (image) => {
        const { id } = await this.dataStoreProvider.saveFile({ file: image })

        await this.saveCarImageRepository.execute({
          carId: carSave.carId,
          imageId: id
        })
      })

      await Promise.all(promises)
    }
  }
}
