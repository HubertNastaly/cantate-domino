import { useInfiniteScroll, useSongs } from "@/hooks"
import { Fragment } from "react"
import { SongCard } from "@/components/common"
import styled from "styled-components"
import { COLUMN_GAP } from "@/constants"
import { cardsNumberInRow } from "@/utils/cardsNumberInRow"
import { LoaderRow } from "./LoaderRow"

const ROWS_PER_CHUNK = 5

interface Props {
  width: number
  filterText?: string
  className?: string
}

export const Songs = ({ className, width, filterText }: Props) => {
  const cardsInRow = cardsNumberInRow(width)
  const songsPerPage = ROWS_PER_CHUNK * cardsInRow
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useSongs(songsPerPage, filterText)
  useInfiniteScroll(fetchNextPage)

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