import { useCallback, useEffect, useState } from 'react'

export function useElementWidth<T extends HTMLElement>() {
  const [elementWidth, setElementWidth] = useState<number>()
  const [observer, setObserver] = useState<ResizeObserver>()

  useEffect(() => {
    const newObserver = new ResizeObserver(([element]) => {
      setElementWidth(getInnerWidth(element.target))
    })
    setObserver(newObserver)
    return () => newObserver.disconnect()
  }, [])

  const setRef = useCallback((node: T) => {
    if(node && observer) {
      observer.observe(node)
    }
  }, [observer])

  return [setRef, elementWidth] as const
}

function getInnerWidth(node: Element) {
  const { width } = node.getBoundingClientRect()
  const { paddingLeft, paddingRight } = window.getComputedStyle(node)
  return width - parseInt(paddingLeft) - parseInt(paddingRight)
}
