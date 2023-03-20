import { Car } from '@/domain/models/car'
import { FindUserByIdRepositoryContract } from '@/domain/repositories'
import { MessageSenderProviderContract } from '@/domain/providers'

export namespace CreateCarUsecase {
  export type Input = Omit<Car, 'carId'>
  export type Output = void
}

export class CreateCarUsecase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepositoryContract,
    private readonly messageSenderProvider: MessageSenderProviderContract
  ) {}

  async execute(
    input: CreateCarUsecase.Input
  ): Promise<CreateCarUsecase.Output> {
    const user = await this.findUserByIdRepository.execute({
      userId: input.userId
    })
    if (!user) {
      throw new Error('User not found')
    }
    await this.messageSenderProvider.send({ body: input })
  }
}
