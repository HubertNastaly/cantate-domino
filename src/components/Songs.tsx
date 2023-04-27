import { useInfiniteScroll, useSongs } from "@/hooks"
import { Fragment } from "react"
import { SongCard } from "./SongCard"
import styled from "styled-components"
import { COLUMN_GAP } from "@/constants"
import { cardsNumberInRow } from "@/utils/cardsNumberInRow"

interface Props {
  width: number
  filterText?: string
  className?: string
}

export const Songs = ({ className, width, filterText }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage } = useSongs(cardsNumberInRow(width), filterText)
  useInfiniteScroll(fetchNextPage)

  return (
    <Container className={className}>
      <List>
        {data?.pages.map(({ songs }, idx) => (
          <Fragment key={`page-${idx}`}>
            {songs.map(song => (
              <SongCard key={song.id} song={song}  />
            ))}
          </Fragment>
        ))}
      </List>
      {isFetchingNextPage && <span>Loading...</span>}
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