export const CARD_SIZE = {
  big: 160,
  small: 84,
  tiny: 48
}
export const COLUMN_GAP = 32
export const EMPTY_FILTER_CHAR = '*'
export const BREAKPOINT = {
  mobile: 480,
  tablet: 768,
}
export const PAGE_CONTENT_WIDTH = 1024

export const REPERTOIRE_ITEMS = ['mess', 'opening', 'sacrifice', 'communion', 'adoration', 'ending'] as const
const CONFIG_SCHEMA = REPERTOIRE_ITEMS.map(param => `${param}=.*`).join('&')
export const REPERTOIRE_CONFIG_REGEX = new RegExp(CONFIG_SCHEMA)

export const REPERTOIRE_ITEM_NAMES: Record<typeof REPERTOIRE_ITEMS[number], string> = {
  mess: 'Msza',
  opening: 'Wejście',
  sacrifice: 'Ofiarowanie',
  communion: 'Komunia',
  adoration: 'Uwielbienie',
  ending: 'Wyjście'
}
