import { series } from 'gulp'
import { gulpTask } from '@vunk/shared/function'

export default series(
  gulpTask('custom task', async () => {

  }),
)


