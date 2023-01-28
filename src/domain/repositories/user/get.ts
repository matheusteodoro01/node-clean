import { User } from "../../models";

export namespace GetUserRepositoryContract {
  export type Input = { userId: string }
  export type Output = User
}

export interface GetUserRepositoryContract {
  execute(input: GetUserRepositoryContract.Input): Promise<GetUserRepositoryContract.Output>
}