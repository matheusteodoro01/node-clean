import * as z from 'zod'

export const uploadCarImageDto = z.object({
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Buffer)
})
