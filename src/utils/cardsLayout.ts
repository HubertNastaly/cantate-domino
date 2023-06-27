import { BREAKPOINT, CARD_SIZE, COLUMN_GAP } from '@/constants'
import { CardSize, SongsLayout } from '@/types'

export function cardsLayout(width: number) {
  const layout: SongsLayout = width < BREAKPOINT.tablet ? 'list' : 'grid'
  const cardSize: CardSize = layout === 'list' ? 'small' : 'big'
  const cardsInRow = cardsNumberInRow(width, cardSize)

  return { cardSize, cardsInRow, layout }
}

function cardsNumberInRow(containerWidth: number, cardSize: CardSize) {
  return Math.floor((containerWidth + COLUMN_GAP) / (CARD_SIZE[cardSize] + COLUMN_GAP))
}
