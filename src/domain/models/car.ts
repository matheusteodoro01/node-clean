export enum Exchange {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual'
}

export type Car = {
  userId: string
  carId: string
  model: string
  brand: string
  year: string
  km: number
  exchange: Exchange
  bodywork: string
  fuel: string
  endOfBoard: number
  color: string
  acceptExchange: boolean
  licensed: boolean
  vehicleItems: string[]
  price: number
  images?: string[]
}
