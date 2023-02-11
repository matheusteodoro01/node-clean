import { MessageSenderProviderContract } from '@/domain/providers'
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'

export class SQSMessageSenderProvider implements MessageSenderProviderContract {
  constructor(
    private readonly sqsClient: SQSClient,
    private readonly queue: string
  ) {}
  async send({
    body
  }: MessageSenderProviderContract.Input): Promise<MessageSenderProviderContract.Output> {
    await this.sqsClient.send(
      new SendMessageCommand({
        QueueUrl: this.queue,
        MessageBody: JSON.stringify(body)
      })
    )
  }
}
