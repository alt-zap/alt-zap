/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import withIntl from './withIntl'
import Feedback from '../common/Feedback'

export default {
  title: 'common/Feedback',
  component: Feedback,
  decorators: [withIntl],
}

export const Component = () => <Feedback />
