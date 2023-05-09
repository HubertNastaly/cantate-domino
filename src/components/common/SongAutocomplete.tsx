import { useRef, useState } from "react"
import { SearchBar } from "./SearchBar"
import { useOutsideClick, useSongs } from "@/hooks"
import styled from "styled-components"
import { SongCard, smallShadow } from "./SongCard"
import { COLORS } from "@/utils/colors"
import { Song } from "@/types"

const SUGGESTIONS_COUNT = 5

interface Props {
  onSelect: (song: Song) => void
}

export const Autocomplete = ({ onSelect }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const suggestionsRef = useRef<HTMLUListElement>(null)
  useOutsideClick(suggestionsRef, () => setIsFocused(false))

  const { data } = useSongs(SUGGESTIONS_COUNT, searchPhrase, true)
  const suggestions = data?.pages[0].songs

  return (
    <Container>
      <SearchBar value={searchPhrase} onChange={setSearchPhrase} onFocus={() => setIsFocused(true)} />
      {isFocused && (
        <Suggestions ref={suggestionsRef}>
          {suggestions?.map(song => (
            <ListItem key={song.id} onClick={() => onSelect(song)}>
              <SongCardStyled
                song={song}
                titlePlacement="right"
                size="tiny"
              />
            </ListItem>
          ))}
        </Suggestions>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Suggestions = styled.ul`
  position: absolute;
  z-index: 3;
  width: 100%;
  list-style-type: none;
  padding: 0;
  background-color: ${COLORS.background};

  ${smallShadow}
`

const ListItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  transition: background-color 0.2s ease-out;

  border-bottom: 1px solid ${COLORS.faded};
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #EEEEEE;
  }
`

const SongCardStyled = styled(SongCard)`
  width: 100%;
`
