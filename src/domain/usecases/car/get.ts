import { GetCarRepositoryContract } from '@/domain/repositories'
import { Car } from '@/domain/models'


export namespace GetCarUsecase {
  export type Input = { carId: string, }
  export type Output = Car
}

export class GetCarUsecase {
  constructor(
    private readonly getCarRepositoryContract: GetCarRepositoryContract,
  ) { }

  async execute({ carId }: GetCarUsecase.Input): Promise<GetCarUsecase.Output> {
    const car = await this.getCarRepositoryContract.execute({ carId })
    if (!car) {
      throw new Error('Car not found')
    }
    return car
  }
}