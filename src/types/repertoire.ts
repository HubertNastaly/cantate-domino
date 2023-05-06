import { REPERTOIRE_ITEMS } from "@/constants";
import { Song } from "./song";

export type RepertoireItem = typeof REPERTOIRE_ITEMS[number]
export type Repertoire = Record<RepertoireItem, Song>
