import { HttpException, HttpStatus } from '@nestjs/common'

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
  }
}
