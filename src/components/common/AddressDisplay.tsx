import React, { FC } from 'react'

import { WorldAddress } from '../../typings'

type Props = { address?: Partial<WorldAddress> }

const AddressDisplay: FC<Props> = ({ address }) => {
  return (
    <div className="flex flex-column">
      <span className="f5">
        {`${address?.street}, ${address?.number ?? 's/n'}`}
      </span>
      <span className="f5 light-silver">
        {address?.complement ? `${address?.complement} - ` : ''}
        {address?.district}
      </span>
      <span className="f5 light-silver">
        {address?.city} - {address?.state}
      </span>
    </div>
  )
}

export default AddressDisplay
