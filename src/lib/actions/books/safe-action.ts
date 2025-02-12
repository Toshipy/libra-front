import logger from '@/lib/logger'
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient
} from 'next-safe-action'

class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    logger.error({ message: e.message }, 'Action error:')

    if (e instanceof ActionError) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  }
}).use(async ({ next, clientInput, metadata }) => {
  const log = logger.child({ module: 'Action logging' })

  const startTime = performance.now()

  const result = await next()

  const endTime = performance.now()

  log.info({ result }, 'Result')
  log.info({ clientInput }, 'Client input')
  log.info({ metadata }, 'Metadata')
  log.info(
    { 'action execution took': `${endTime - startTime}ms` },
    'Action execution took'
  )

  return result
})
