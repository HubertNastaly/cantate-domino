import { KeyboardEvent, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { SearchBar } from './SearchBar'
import { SongCard, smallShadow } from './SongCard'
import { Spinner } from './Spinner'
import { useOutsideClick, useSongs } from '@/hooks'
import { COLORS } from '@/utils/colors'
import { Song } from '@/types'

const SUGGESTIONS_COUNT = 5

interface Props {
  onSelect: (song: Song) => void
}

export const Autocomplete = ({ onSelect }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [focusedListItemIndex, setFocusedListItemIndex] = useState<number>()

  const suggestionsRef = useRef<HTMLUListElement>(null)
  useOutsideClick(suggestionsRef, () => setIsFocused(false))

  const { data } = useSongs(SUGGESTIONS_COUNT, searchPhrase, true)
  const suggestions = data?.pages[0].songs
  const shouldShowSuggestions = searchPhrase.length > 0

  // listItemIndex and suggestions as arguments and not dependencies in order not to redeclare function
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>, focusedListItemIndex: number | undefined, suggestions: Song[] | undefined) => {
    switch(event.code) {
      case 'ArrowDown': {
        event.preventDefault()
        return setFocusedListItemIndex(focusedListItemIndex =>
          focusedListItemIndex === undefined ? 0 : Math.min(focusedListItemIndex + 1, SUGGESTIONS_COUNT - 1)
        )
      }
      case 'ArrowUp': {
        event.preventDefault()
        return setFocusedListItemIndex(focusedListItemIndex =>
          focusedListItemIndex === undefined ? undefined : Math.max(0, focusedListItemIndex - 1)
        )
      }
      case 'Enter': {
        if(suggestions && focusedListItemIndex !== undefined) {
          onSelect(suggestions[focusedListItemIndex])
        }
        return
      }
    }
  }, [setFocusedListItemIndex, onSelect])

  return (
    <Container onKeyDown={event => handleKeyDown(event, focusedListItemIndex, suggestions)}>
      <SearchBar value={searchPhrase} onChange={setSearchPhrase} onFocus={() => setIsFocused(true)} />
      {isFocused && (
        <Suggestions ref={suggestionsRef}>
          {shouldShowSuggestions && (
            <SuggestionsList
              suggestions={suggestions}
              onSelect={onSelect}
              focusedListItemIndex={focusedListItemIndex}
            />
          )}
        </Suggestions>
      )}
    </Container>
  )
}

interface SuggestionsListProps {
  suggestions: Song[] | undefined
  onSelect: (song: Song) => void
  focusedListItemIndex: number | undefined
}

const SuggestionsList = ({ suggestions, onSelect, focusedListItemIndex }: SuggestionsListProps) => {
  if(!suggestions) {
    return (
      <ListItem>
        <CenteredSpinner size={32} />
      </ListItem>
    )
  }

  if(suggestions.length === 0) {
    return (
      <ListItem>
        <NoResultsText>Brak wyników</NoResultsText>
      </ListItem>
    )
  }

  return (
    <>
      {suggestions.map((song, index) => (
        <ListItem
          key={song.id}
          onClick={() => onSelect(song)}
          focused={index === focusedListItemIndex}
        >
          <SongCardStyled
            song={song}
            titlePlacement="right"
            size="tiny"
          />
        </ListItem>
      ))}
    </>
  )
}

const Container = styled.div`
  position: relative;
`

const NoResultsText = styled.span`
  font-size: 18px;
  color: ${COLORS.primary};
`

const CenteredSpinner = styled(Spinner)`
  display: block;
  margin: 0 auto;
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

const ListItem = styled.li<{ focused?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.focused ? COLORS.faded : COLORS.background};

  transition: background-color 0.2s ease-out;

  border-bottom: 1px solid ${COLORS.faded};
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${props => props.onClick ? COLORS.faded : COLORS.background};
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
  }
`

const SongCardStyled = styled(SongCard)`
  width: 100%;
`
