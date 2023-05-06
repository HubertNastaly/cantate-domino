import { RepertoireItem } from '@/types'
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
  songId: string | undefined
}

export const RepertoireListItem = ({ label, songId }: Props) => {
  return (
    <ListItem>
      <Label>{REPERTOIRE_ITEM_NAMES[label]}</Label>
      {!songId ? (
        <Cover size={CARD_SIZE.small} />
      ) : (
        <SongCardStyled
          song={{ id: songId, name: 'Placeholder name' }}
          titlePlacement="right"
          small
          clickable
        />
      )}
    </ListItem>
  )
}

const ListItem = styled.li``

const Label = styled.h3`
  font-weight: 300;
  margin-bottom: 16px;
`

const SongCardStyled = styled(SongCard)`
  width: 100%;
`
