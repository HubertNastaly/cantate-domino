import { Song } from './song';
import { REPERTOIRE_ITEMS } from '@/constants';

export type RepertoireItem = typeof REPERTOIRE_ITEMS[number]
export type Repertoire = Record<RepertoireItem, Song | undefined>
