import { User } from '../../models'

export namespace SaveUserRepositoryContract {
  export type Input = Omit<User, 'userId'>
  export type Output = User
}

export interface SaveUserRepositoryContract {
  execute(
    input: SaveUserRepositoryContract.Input
  ): Promise<SaveUserRepositoryContract.Output>
}
