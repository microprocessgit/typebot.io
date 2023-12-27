// Reference: https://developers.facebook.com/docs/meta-pixel/reference#standard-events
import { TimerBlock } from './schema'

export enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}

export const defaultApiAttributes = {
  method: HttpMethod.POST,
} as const

export const defaultTimerOptions = {
  timer: '4',
  isParams: false
} as const satisfies TimerBlock['options']

