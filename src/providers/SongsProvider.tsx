import { ReactNode, createContext, useContext, useState } from 'react';
import { useSongs } from '@/hooks';

type Context = ReturnType<typeof useSongs> & {
  songsPerPage: number
  setSongsPerPage: (value: number) => void 
  searchPhrase: string
  setSearchPhrase: (value: string) => void
}

const songsContext = createContext<Context>({} as Context)

interface Props {
  children?: ReactNode
}

export const SongsProvider = ({ children }: Props) => {
  const [songsPerPage, setSongsPerPage] = useState(0)
  const [searchPhrase, setSearchPhrase] = useState('')
  const { fetchNextPage, ...queryResult } = useSongs(songsPerPage, searchPhrase)

  return (
    <songsContext.Provider value={{ fetchNextPage, ...queryResult, songsPerPage, setSongsPerPage, searchPhrase, setSearchPhrase }}>
      {children}
    </songsContext.Provider>
  )
}

export const useSongsContext = () => useContext(songsContext)
