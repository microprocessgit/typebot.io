import { z } from 'zod'
import { blockBaseSchema } from '../../shared'
import { IntegrationBlockType } from '../constants'
import { jumpOptionsSchema } from '../../logic/jump/schema'

export const timerOptionsBaseSchema = z.object({
  timer: z.string().optional(),
  id: z.string().optional(),
})

export const timerOptionsSchema = timerOptionsBaseSchema
  .merge(jumpOptionsSchema)

export const timerBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([IntegrationBlockType.TIMER]),
    options: timerOptionsSchema.optional(),
  })
)

export type TimerBlock = z.infer<typeof timerBlockSchema>

export const timerResponseSchema = z.object({
  results: z.array(
    z.object({
      text: z.string(),
      status: z.number(),
    })
  ),
  summary: z.string(),
})

export type TimerResponse = z.infer<typeof timerResponseSchema>