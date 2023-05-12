import { useInfiniteScroll } from "@/hooks"
import { Fragment, useEffect } from "react"
import { SongCard } from "@/components/common"
import styled, { css } from "styled-components"
import { BREAKPOINT, COLUMN_GAP } from "@/constants"
import { cardsNumberInRow } from "@/utils/cardsNumberInRow"
import { LoaderRow } from "./LoaderRow"
import { useSongsContext } from "@/providers"
import { CardSize } from "@/types"

const ROWS_PER_CHUNK = 5

interface Props {
  width: number
  filterText?: string
  className?: string
}

export const Songs = ({ className, width }: Props) => {
  const smallScreen = width < BREAKPOINT.tablet
  const cardSize: CardSize = smallScreen ? 'small' : 'big'
  const cardsInRow = cardsNumberInRow(width, cardSize)
  const { data, fetchNextPage, isFetchingNextPage, isLoading, setSongsPerPage } = useSongsContext()
  useInfiniteScroll(fetchNextPage)

  useEffect(() => {
    setSongsPerPage(ROWS_PER_CHUNK * cardsInRow)
  }, [cardsInRow, setSongsPerPage])

  const isBusy = isFetchingNextPage || isLoading

  return (
    <Container className={className}>
      <List view={smallScreen ? 'list' : 'cards'}>
        {data?.pages.map(({ songs }, idx) => (
          <Fragment key={`page-${idx}`}>
            {songs.map(song => (
              <li key={song.id}>
                <SongCard song={song} size={cardSize} clickable titlePlacement={smallScreen ? 'right' : 'bottom'} />
              </li>
            ))}
          </Fragment>
        ))}
        {isBusy && <LoaderRow cardsInRow={cardsInRow} cardSize={cardSize} />}
      </List>
    </ Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const listViewStyles = css`
  flex-direction: column;
  row-gap: 16px;
`

const cardsViewStyles = css`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 64px;
  column-gap: ${COLUMN_GAP}px;
`

const List = styled.ul<{ view: 'list' | 'cards' }>`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0;
  list-style-type: none;

  ${props => props.view === 'list' ? listViewStyles : cardsViewStyles}
`
