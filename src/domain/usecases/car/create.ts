import { Car } from '@/domain/models/car'
import { GetUserRepositoryContract } from '@/domain/repositories'
import { MessageSenderProviderContract } from '@/domain/providers'

export namespace CreateCarUsecase {
  export type Input = {
    userId: string
    car: Omit<Car, 'carId'>
    images: string[]
  }
  export type Output = void
}

export class CreateCarUsecase {
  constructor(
    private readonly messageSenderProvider: MessageSenderProviderContract,
    private readonly getUserRepository: GetUserRepositoryContract
  ) {}

  async execute({
    car,
    images,
    userId
  }: CreateCarUsecase.Input): Promise<CreateCarUsecase.Output> {
    const user = await this.getUserRepository.execute({ userId })
    if (!user) {
      throw new Error('User not found')
    }
    await this.messageSenderProvider.send({ body: { car, images, userId } })
  }
}
