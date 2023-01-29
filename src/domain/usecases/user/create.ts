import { User } from '@/domain/models'
import { SaveUserRepositoryContract } from '@/domain/repositories'
import { EmailValidatorProviderContract } from '@/domain/providers'

export namespace CreateUserUsecase {
  export type Input = Omit<User, 'userId'>
  export type Output = User
}

export class CreateUserUsecase {
  constructor(
    private readonly saveUserRepository: SaveUserRepositoryContract,
    private readonly emailValidatorProvider: EmailValidatorProviderContract
  ) { }

  async execute({ email, password, passwordConfirmation, name, phone }: CreateUserUsecase.Input): Promise<CreateUserUsecase.Output> {

    const emailValid = this.emailValidatorProvider.validate({ email })

    if (!emailValid) {
      throw new Error('Invalid email')
    }

    const user = await this.saveUserRepository.execute({ email, password, passwordConfirmation, name, phone })

    return user
  }
}