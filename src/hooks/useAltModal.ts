import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { useCallback } from 'react'

export const useAltModal = (id: string) => {
  const location = useLocation()

  const show = useCallback(() => {
    navigate(location.pathname, { state: { [id]: true } })
  }, [location, id])

  const close = useCallback(() => {
    navigate(-1)
  }, [])

  const modalProps = {
    onCancel: () => close(),
    visible: !!(location.state && id in location.state),
    destroyOnClose: true,
  }

  return { show, close, modalProps }
}
