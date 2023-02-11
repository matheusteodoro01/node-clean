import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'

import { domain } from '@/domain/common/ioc'
import { CreateCarUsecase } from '@/domain/usecases'
import { createCarDto } from '@/infra/dto'

@Controller('car')
export class CreateCarController {
  constructor(
    @Inject(domain.usecases.car.create)
    private readonly createCarUsecase: CreateCarUsecase
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async execute(@Body() data: any) {
    return await this.createCarUsecase.execute(createCarDto.parse(data))
  }
}
