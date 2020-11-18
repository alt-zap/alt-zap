import { useEffect } from 'react'

export const useObserver = (
  ref: React.RefObject<any>,
  rootMargin: string,
  cb: (isIt: boolean) => void
) => {
  useEffect(() => {
    if (!ref?.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          cb(entry.isIntersecting)
        })
      },
      { rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      ref?.current && observer.unobserve(ref?.current)
    }
  }, [ref, cb])
}
