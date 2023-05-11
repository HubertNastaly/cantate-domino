import { useInfiniteScroll } from "@/hooks"
import { Fragment, useEffect } from "react"
import { SongCard } from "@/components/common"
import styled from "styled-components"
import { COLUMN_GAP } from "@/constants"
import { cardsNumberInRow } from "@/utils/cardsNumberInRow"
import { LoaderRow } from "./LoaderRow"
import { useSongsContext } from "@/providers"

const ROWS_PER_CHUNK = 5

interface Props {
  width: number
  filterText?: string
  className?: string
}

export const Songs = ({ className, width }: Props) => {
  const cardsInRow = cardsNumberInRow(width)
  const { data, fetchNextPage, isFetchingNextPage, isLoading, setSongsPerPage } = useSongsContext()
  useInfiniteScroll(fetchNextPage)

  useEffect(() => {
    setSongsPerPage(ROWS_PER_CHUNK * cardsInRow)
  }, [cardsInRow, setSongsPerPage])

  const isBusy = isFetchingNextPage || isLoading

  return (
    <Container className={className}>
      <List>
        {data?.pages.map(({ songs }, idx) => (
          <Fragment key={`page-${idx}`}>
            {songs.map(song => (
              <li key={song.id}>
                <SongCard song={song} size="big" clickable />
              </li>
            ))}
          </Fragment>
        ))}
        {isBusy && <LoaderRow cardsInRow={cardsInRow} />}
      </List>
    </ Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const List = styled.ul`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: ${COLUMN_GAP}px;
  row-gap: 64px;
  padding: 0;
  list-style-type: none;
`