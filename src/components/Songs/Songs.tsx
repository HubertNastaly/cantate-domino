import { useInfiniteScroll } from '@/hooks'
import { useEffect } from 'react'
import { useSongsContext } from '@/providers'
import { SongsView } from './SongsView'
import { cardsLayout } from '@/utils/cardsLayout'

const ROWS_PER_CHUNK = 5

interface Props {
  width: number
  filterText?: string
  className?: string
}

export const Songs = ({ className, width }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading, setSongsPerPage } = useSongsContext()
  useInfiniteScroll(fetchNextPage)

  const { cardsInRow } = cardsLayout(width)

  useEffect(() => {
    setSongsPerPage(ROWS_PER_CHUNK * cardsInRow)
  }, [cardsInRow, setSongsPerPage])

  return (
    <SongsView
      width={width}
      songs={data?.pages.flatMap(({ songs }) => songs) ?? []}
      isLoading={isFetchingNextPage || isLoading}
      className={className}
    />
  )
}
