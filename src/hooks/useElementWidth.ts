import { useCallback, useEffect, useRef, useState } from "react"

export function useElementWidth<T extends HTMLElement>() {
  const [elementWidth, setElementWidth] = useState<number>()
  const elementRef = useRef<T|null>(null)

  const updateWidth = useCallback(() => {
    if(elementRef.current) {
      setElementWidth(getInnerWidth(elementRef.current))
    }
  }, [])

  useEffect(() => {
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const setRef = useCallback((node: T) => {
    if(node) {
      setElementWidth(getInnerWidth(node))
      window.addEventListener('resize', updateWidth)
    }

    elementRef.current = node
  }, [])

  return [setRef, elementWidth] as const
}

function getInnerWidth(node: Element) {
  const { width } = node.getBoundingClientRect()
  const { paddingLeft, paddingRight } = window.getComputedStyle(node)
  return width - parseInt(paddingLeft) - parseInt(paddingRight)
}
