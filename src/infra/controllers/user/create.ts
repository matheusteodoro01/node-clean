import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'

import { domain } from '@/domain/common/ioc'
import { CreateUserUsecase } from '@/domain/usecases'
import { createUserDto } from '@/infra/dto'

@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(domain.usecases.user.create)
    private readonly createUserUsecase: CreateUserUsecase
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async execute(@Body() data: any) {
    console.log(data.toString())
    return await this.createUserUsecase.execute(createUserDto.parse(data))
  }
}
