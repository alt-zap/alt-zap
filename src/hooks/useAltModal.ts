import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useAltModal = (id: string) => {
  const location = useLocation()
  const navigate = useNavigate()

  const show = useCallback(() => {
    navigate(location.pathname, { state: { [id]: true } })
  }, [navigate, location.pathname, id])

  const close = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const modalProps = {
    onCancel: () => close(),
    visible: !!(
      location.state && id in (location.state as Record<string, unknown>)
    ),
    destroyOnClose: true,
  }

  return { show, close, modalProps }
}
