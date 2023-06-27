import { useEffect } from 'react'
import { useElementWidth } from './useElementWidth'
import { BREAKPOINT } from '@/constants'

export const useDevice = () => {
  const [setRef, width] = useElementWidth()

  useEffect(() => {
    const body = document.getElementsByTagName('body').item(0)
    if(body) {
      setRef(body)
    }
  }, [setRef])

  return width ? getDevice(width) : undefined
}

function getDevice(width: number) {
  if(width > BREAKPOINT.tablet) {
    return 'desktop'
  }
  if(width > BREAKPOINT.mobile) {
    return 'tablet'
  }
  return 'mobile'
}
