export namespace MessageSenderProviderContract {
  export type Input = { body: any }
  export type Output = void
}

export interface MessageSenderProviderContract {
  send(
    input: MessageSenderProviderContract.Input
  ): Promise<MessageSenderProviderContract.Output>
}
