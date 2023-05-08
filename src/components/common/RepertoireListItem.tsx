import { RepertoireItem, Song } from '@/types'
import styled from 'styled-components'
import { CARD_SIZE } from '@/constants'
import { MdDelete } from 'react-icons/md'
import { Cover, SongCard } from './SongCard'
import { IconButton } from './IconButton'

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
          <IconButton size={36} onClick={onRemove}>
            <MdDelete size={24} />
          </IconButton>
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
