import 'reflect-metadata'
import type { SQSEvent, SQSHandler } from 'aws-lambda'
import { NestFactory } from '@nestjs/core'
import { domain } from '@/domain/common/ioc'

import { INestApplicationContext } from '@nestjs/common'
import { ProccessCarModule } from '@/main/modules/lambdas/process-car.module'
import { proccessCarDto } from '@/infra/dto'
import { ProcessCarUsecase } from '@/domain/usecases'

export const process = (app: INestApplicationContext) => {
  const authorizeBatchUseCase = app.get<ProcessCarUsecase>(
    domain.usecases.car.process
  )
  return async (event: SQSEvent) => {
    const promises = event.Records.map(({ body }) =>
      authorizeBatchUseCase.execute(proccessCarDto.parse(JSON.parse(body)))
    )
    await Promise.all(promises)
    await app.close()
  }
}

export const handler: SQSHandler = async (event): Promise<void> => {
  console.log(JSON.stringify(event))
  const app = await NestFactory.createApplicationContext(ProccessCarModule)
  const processor = process(app)
  await processor(event)
}
export default handler
