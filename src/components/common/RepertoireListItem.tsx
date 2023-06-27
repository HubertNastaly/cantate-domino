import styled from 'styled-components'
import { MdDelete } from 'react-icons/md'
import { Cover, SongCard } from './SongCard'
import { RoundedIconButton } from './IconButton'
import { Song } from '@/types'
import { CARD_SIZE } from '@/constants'

interface Props {
  label: string
  song: Song | undefined
  onRemove?: () => void
}

export const RepertoireListItem = ({ label, song, onRemove }: Props) => {
  return (
    <ListItem>
      <RepertoireItemLabel>{label}</RepertoireItemLabel>
      <Row>
        {!song ? (
          <Cover size={CARD_SIZE.tiny} />
        ) : (
          <SongCardStyled
            song={song}
            titlePlacement="right"
            size="tiny"
            clickable
          />
        )}
        {onRemove && (
          <RoundedIconButton size={36} onClick={onRemove}>
            <MdDelete size={24} />
          </RoundedIconButton>
        )}
      </Row>
    </ListItem>
  )
}

const ListItem = styled.li``

export const RepertoireItemLabel = styled.h3`
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 8px;
`

const SongCardStyled = styled(SongCard)`
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
