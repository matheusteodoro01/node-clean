import { HttpStatus } from '@nestjs/common'
import {
  NotFoundError,
} from '@/domain/errors'

type Code = {
  http: number
}

export const getStatusCode = (error: Error): Code => {
  switch (error.constructor) {
    case NotFoundError:
      return { http: HttpStatus.NOT_FOUND }

    default:
      return {
        http: HttpStatus.INTERNAL_SERVER_ERROR
      }
  }
}
