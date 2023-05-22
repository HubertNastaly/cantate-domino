import { COLUMN_GAP } from "@/constants"
import { Song, SongsLayout } from "@/types"
import styled, { css } from "styled-components"
import { LoaderRow } from "./LoaderRow"
import { SongCard } from "../common"
import { cardsLayout } from "@/utils/cardsLayout"

interface Props {
  songs: Song[]
  width: number
  isLoading?: boolean
  className?: string
}

export const SongsView = ({ songs, width, isLoading, className }: Props) => {
  const { layout, cardSize, cardsInRow } = cardsLayout(width)

  return (
    <Container className={className}>
      <List layout={layout}>
        {songs.map(song => (
          <li key={song.id}>
            <SongCard song={song} size={cardSize} clickable titlePlacement={layout === 'list' ? 'right' : 'bottom'} />
          </li>
        ))}
        {isLoading && <LoaderRow cardsInRow={cardsInRow} cardSize={cardSize} />}
      </List>
    </ Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const listLayoutStyles = css`
  flex-direction: column;
  row-gap: 16px;
`

const cardsLayoutStyles = css`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 64px;
  column-gap: ${COLUMN_GAP}px;
`

const List = styled.ul<{ layout: SongsLayout }>`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0;
  list-style-type: none;

  ${props => props.layout === 'list' ? listLayoutStyles : cardsLayoutStyles}
`
