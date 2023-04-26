import { useEffect } from 'react'

const BOTTOM_OFFSET = 100

export const useInfiniteScroll = (onEndReached: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY + window.innerHeight >= document.body.offsetHeight - BOTTOM_OFFSET) {
        onEndReached()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onEndReached])
}
