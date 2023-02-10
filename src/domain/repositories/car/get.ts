import { Car } from '@/domain/models/car'

export namespace GetCarRepositoryContract {
  export type Input = { carId: string }
  export type Output = Car
}

export interface GetCarRepositoryContract {
  execute(
    input: GetCarRepositoryContract.Input
  ): Promise<GetCarRepositoryContract.Output>
}
