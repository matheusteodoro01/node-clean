import { Exchange } from '@/domain/models'
import { string, number, boolean, nativeEnum, array, object } from 'zod'

export const proccessCarDto = object({
  userId: string(),
  model: string(),
  brand: string(),
  year: string(),
  km: number(),
  exchange: nativeEnum(Exchange),
  bodywork: string(),
  fuel: string(),
  endOfBoard: number(),
  color: string(),
  acceptExchange: boolean(),
  licensed: boolean(),
  vehicleItems: array(string()),
  price: number(),
  images: array(string())
})
