import { CARD_SIZE, COLUMN_GAP } from "@/constants";
import { CardSize } from "@/types";

export function cardsNumberInRow(containerWidth: number, cardSize: CardSize) {
  return Math.floor((containerWidth + COLUMN_GAP) / (CARD_SIZE[cardSize] + COLUMN_GAP))
}
