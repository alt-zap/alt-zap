/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import withIntl from './withIntl'
import Feedback from '../common/Feedback'
import FeedbackButton from '../common/Feedback/Button'

export default {
  title: 'common/Feedback',
  component: Feedback,
  decorators: [withIntl],
}

export const Initial = () => <Feedback onClose={() => {}} />

export const WithBug = () => <Feedback onClose={() => {}} initialType="bug" />

export const OnScreen = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <FeedbackButton />
  </div>
)
