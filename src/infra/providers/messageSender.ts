import { MessageSenderProviderContract } from "@/domain/providers";
import { SQSClient } from "@aws-sdk/client-sqs";

export class SQSMessageSenderProvider implements MessageSenderProviderContract {
  constructor
    (private readonly sqsClient: SQSClient,
      private readonly queue: string
    ) { }
  send(input: MessageSenderProviderContract.Input): Promise<MessageSenderProviderContract.Output> { 
    return Promise.resolve()
  }
}
