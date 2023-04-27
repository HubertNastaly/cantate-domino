import { Song } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useCallback } from "react"

interface PageParam {
  nextPageToken: string | null
  songs: Song[]
}

const ROWS_PER_CHUNK = 5
const API_URL = `/api/songs/all`

export const useSongs = (cardsInRow: number = 0) => {
  const songsPerChunk = ROWS_PER_CHUNK * cardsInRow

  const fetchNextSongsChunk = useCallback(async (pageParam: PageParam | undefined): Promise<PageParam> => {
    if(songsPerChunk === 0) {
      return {
        songs: [],
        nextPageToken: null
      }
    }
    const { nextPageToken } = pageParam ?? {}
    const { data, status } = await axios.get<PageParam>(nextPageToken ? `${API_URL}/${songsPerChunk}/${nextPageToken}` : `${API_URL}/${songsPerChunk}`)
    if(status === 200) {
      return {
        songs: data.songs,
        nextPageToken: data.nextPageToken
      }
    } else {
      throw new Error(`Response: ${status}`)
    }
  }, [songsPerChunk])

  const queryResult = useInfiniteQuery<PageParam>({
    queryKey: ['fetchSongs'],
    queryFn: ({ pageParam }) => fetchNextSongsChunk(pageParam),
    getNextPageParam: (lastPage) => {
      if(!lastPage.nextPageToken) {
        return false
      }
      return lastPage
    }
  })

  const fetchNextPage = useCallback(() => {
    const { hasNextPage, fetchNextPage } = queryResult
    if(hasNextPage) {
      fetchNextPage()
    }
  }, [queryResult])

  return { ...queryResult, fetchNextPage }
}
