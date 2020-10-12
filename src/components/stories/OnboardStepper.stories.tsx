import React from 'react'

import OnboardStepper from '../tenant/onboard/OnboardStepper'
import withIntl from './withIntl'

export default {
  title: 'onboard/OnboardStepper',
  component: OnboardStepper,
  decorators: [withIntl],
}

export const Default = () => <OnboardStepper />
