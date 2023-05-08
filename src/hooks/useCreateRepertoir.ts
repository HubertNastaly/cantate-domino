import { REPERTOIRE_ITEMS } from "@/constants";
import { Repertoire, RepertoireItem, Song } from "@/types";
import { useCallback, useState } from "react";

const EMPTY_REPERTOIRE = Object.fromEntries(REPERTOIRE_ITEMS.map(item => [item, undefined] as const)) as Repertoire

export function useCreateRepertoir() {
  const [repertoire, setRepertoire] = useState<Repertoire>(EMPTY_REPERTOIRE)

  const addSong = useCallback((repertoireItem: RepertoireItem, song: Song) => {
    setRepertoire(repertoire => ({
      ...repertoire,
      [repertoireItem]: song
    }))
  }, [setRepertoire])

  const removeSong = useCallback((repertoireItem: RepertoireItem) => {
    setRepertoire(repertoire => ({
      ...repertoire,
      [repertoireItem]: undefined
    }))
  }, [setRepertoire])

  return { repertoire, addSong, removeSong }
}
