export const REPERTOIRE_ITEMS = ['mess', 'opening', 'sacrifice', 'communion', 'adoration', 'ending'] as const
export type RepertoireItem = typeof REPERTOIRE_ITEMS[number]
