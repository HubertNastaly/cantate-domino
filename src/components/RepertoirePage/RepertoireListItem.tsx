import { RepertoireItem, Song } from '@/types'
import styled from 'styled-components'
import { Cover, SongCard } from '../common'
import { CARD_SIZE } from '@/constants'

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
}

export const RepertoireListItem = ({ label, song }: Props) => {
  return (
    <ListItem>
      <Label>{REPERTOIRE_ITEM_NAMES[label]}</Label>
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
