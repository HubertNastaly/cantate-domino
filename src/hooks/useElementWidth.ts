import { useEffect, useRef, useState } from "react"

export function useElementWidth<T extends HTMLElement>() {
  const [elementWidth, setElementWidth] = useState<number>()
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if(elementRef.current) {
      setElementWidth(elementRef.current.getBoundingClientRect().width)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current])

  return [elementRef, elementWidth] as const
}
