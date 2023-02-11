import { User } from '../../models'

export namespace FindUserByIdRepositoryContract {
  export type Input = { userId: string }
  export type Output = User
}

export interface FindUserByIdRepositoryContract {
  execute(
    input: FindUserByIdRepositoryContract.Input
  ): Promise<FindUserByIdRepositoryContract.Output>
}
