import { Car } from '../../models'

export namespace SaveCarRepositoryContract {
  export type Input = Omit<Car, 'carId'>
  export type Output = Car
}

export interface SaveCarRepositoryContract {
  execute(
    input: SaveCarRepositoryContract.Input
  ): Promise<SaveCarRepositoryContract.Output>
}
