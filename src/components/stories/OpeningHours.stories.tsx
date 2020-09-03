import React from 'react'

import OpeningHours from '../tenant/operation/OpeningHours'

export default {
  title: 'tenant|OpeningHours',
  component: OpeningHours,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const WithData = () => <OpeningHours />
