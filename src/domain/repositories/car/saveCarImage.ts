export namespace SaveCarImageRepositoryContract {
  export type Input = { imageId: string; carId: string }
  export type Output = void
}

export interface SaveCarImageRepositoryContract {
  execute(
    input: SaveCarImageRepositoryContract.Input
  ): Promise<SaveCarImageRepositoryContract.Output>
}
