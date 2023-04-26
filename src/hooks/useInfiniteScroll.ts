import { useEffect } from 'react'

export const useInfiniteScroll = (onEndReached: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        onEndReached()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onEndReached])
}
