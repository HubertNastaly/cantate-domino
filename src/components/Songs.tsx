import { useSongs } from "@/hooks"
import { Fragment } from "react"
import { SongCard } from "./SongCard"
import styled from "styled-components"

interface Props {
  className?: string
}

export const Songs = ({ className }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useSongs()
  const isDisabled = isFetchingNextPage || !hasNextPage

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
      <button onClick={() => fetchNextPage()} disabled={isDisabled}>{isFetchingNextPage ? 'Loading...' : 'More'}</button>
      {!hasNextPage && <div>ALL CONTENT LOADED</div>}
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
  column-gap: 16px;
  row-gap: 64px;
  padding: 0;
`