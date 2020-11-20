import { styled } from 'linaria/react'
import React from 'react'

import { useAltIntl } from '../intlConfig'
import { Order } from '../typings'
import Real from './Real'

type Props = {
  order: Order | null
  shouldDisplayButton?: boolean
}

const Totalizer = React.forwardRef<HTMLDivElement, Props>(
  function WrappedTotalizer({ order, shouldDisplayButton }, ref) {
    const { formatMessage } = useAltIntl()
    const selectedMethod = order?.shipping?.type
    const isDelivery = selectedMethod === 'DELIVERY'
    const isTakeaway = selectedMethod === 'TAKEAWAY'

    const fee = order?.shipping?.price ?? 0

    return (
      <div
        ref={ref}
        className="flex flex-column items-center w-100 bg-washed-blue h-100 pa3 br3 shadow-2"
      >
        <div className="w-100">
          <div className="flex justify-between items-center">
            <div className="flex flex-column justify-center">
              <b>{formatMessage({ id: 'order.totalizer.total' })}</b>
              <span className="light-silver f6">
                {isTakeaway &&
                  formatMessage({ id: 'order.totalizer.freeTakeaway' })}
                {isDelivery && fee > 0 && (
                  <span>
                    {formatMessage({ id: 'order.totalizer.delivery' })}
                    <Real cents={fee} />
                  </span>
                )}
                {isDelivery &&
                  fee === 0 &&
                  formatMessage({ id: 'order.totalizer.freeShipping' })}
              </span>
            </div>
            <span className="f4 b">
              <Real cents={order?.totalizers?.finalPrice ?? 0} />
            </span>
          </div>
        </div>
        <GoDownButton
          shouldDisplay={!!shouldDisplayButton}
          onClick={() => {
            const el = document.getElementById('shipping-selector')

            if (!el) {
              return
            }

            const yOffSet = -110
            const y =
              (el?.getBoundingClientRect().top || 0) +
              window.pageYOffset +
              yOffSet

            window.scrollTo({ top: y, behavior: 'smooth' })
          }}
        >
          {formatMessage({ id: 'order.totalizer.goToShipping' })}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="#FFF"
            className="pl1"
            viewBox="0 0 451.847 451.847"
          >
            <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
          </svg>
        </GoDownButton>
      </div>
    )
  }
)

const GoDownButton = styled.button<{ shouldDisplay: boolean }>`
  &:hover {
    background-color: #01213f;
  }
  background-color: #001529;
  color: white;
  border-radius: 10px;
  padding: 5px;
  border: 0;
  font-size: 12px;
  padding: 3px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-items: center;
  transition: opacity 0.2s;
  opacity: ${(props) => (props.shouldDisplay ? '1' : '0')};
`

export default Totalizer
