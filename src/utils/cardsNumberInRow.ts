import { CARD_SIZE, COLUMN_GAP } from "@/constants";

export function cardsNumberInRow(containerWidth: number) {
  return Math.floor((containerWidth + COLUMN_GAP) / (CARD_SIZE.big + COLUMN_GAP))
}