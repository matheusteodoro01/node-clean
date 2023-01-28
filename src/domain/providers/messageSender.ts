export namespace MessageSenderProviderContract {
  export type Input = { body: any; };
}

export interface MessageSenderProviderContract {
  send(input: MessageSenderProviderContract.Input): Promise<void>;
}
