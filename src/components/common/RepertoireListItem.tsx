import { RepertoireItem, Song } from '@/types'
import styled from 'styled-components'
import { CARD_SIZE } from '@/constants'
import { MdDelete } from 'react-icons/md'
import { Cover, SongCard } from './SongCard'
import { IconButton } from './IconButton'

const REPERTOIRE_ITEM_NAMES: Record<RepertoireItem, string> = {
  mess: 'Msza',
  opening: 'Wejście',
  sacrifice: 'Ofiarowanie',
  communion: 'Komunia',
  adoration: 'Uwielbienie',
  ending: 'Wyjście'
}

interface Props {
  label: RepertoireItem
  song: Song | undefined
  onRemove?: () => void
}

export const RepertoireListItem = ({ label, song, onRemove }: Props) => {
  return (
    <ListItem>
      <Label>{REPERTOIRE_ITEM_NAMES[label]}</Label>
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

const Label = styled.h3`
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 8px;
`

const SongCardStyled = styled(SongCard)`
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
