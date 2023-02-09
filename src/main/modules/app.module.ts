import { CreateUserController } from '@/infra/controllers'
import { Module } from '@nestjs/common'
import { CarModule } from './car.module'

@Module({
  imports: [CarModule],
})
export class AppModule {}
