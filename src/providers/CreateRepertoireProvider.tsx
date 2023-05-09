import { REPERTOIRE_ITEMS } from "@/constants";
import { Repertoire, RepertoireItem, Song } from "@/types";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";

const EMPTY_REPERTOIRE = Object.fromEntries(REPERTOIRE_ITEMS.map(item => [item, undefined] as const)) as Repertoire

interface Context {
  repertoire: Repertoire
  addSong: (repertoireItem: RepertoireItem, song: Song) => void
  removeSong: (repertoireItem: RepertoireItem) => void
  clearRepertoire: () => void
}

const createRepertoireContext = createContext<Context>({
  repertoire: EMPTY_REPERTOIRE,
  addSong: () => null,
  removeSong: () => null,
  clearRepertoire: () => null
})

interface Props {
  children?: ReactNode
}

export const CreateRepertoireProvider = ({ children }: Props) => {
  const [repertoire, setRepertoire] = useState<Repertoire>(EMPTY_REPERTOIRE)

  const addSong = (repertoireItem: RepertoireItem, song: Song) => {
    setRepertoire(repertoire => ({
      ...repertoire,
      [repertoireItem]: song
    }))
  }

  const removeSong = (repertoireItem: RepertoireItem) => {
    setRepertoire(repertoire => ({
      ...repertoire,
      [repertoireItem]: undefined
    }))
  }

  const clearRepertoire = () => setRepertoire(EMPTY_REPERTOIRE)

  return (
    <createRepertoireContext.Provider value={{ repertoire, addSong, removeSong, clearRepertoire }}>
      {children}
    </createRepertoireContext.Provider>
  )
}

export const useCreateRepertoire = () => useContext(createRepertoireContext)
