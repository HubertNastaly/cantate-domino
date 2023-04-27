import { EMPTY_FILTER_CHAR } from "@/constants"
import { Song } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useCallback, useEffect } from "react"

interface PageParam {
  nextPageToken: string | null
  songs: Song[]
}

const ROWS_PER_CHUNK = 5
const API_URL = `/api/songs/all`

export const useSongs = (cardsInRow: number = 0, filterText = '') => {
  const songsPerChunk = ROWS_PER_CHUNK * cardsInRow

  const fetchNextSongsChunk = useCallback(async (pageParam: PageParam | undefined, filterText: string): Promise<PageParam> => {
    if(songsPerChunk === 0) {
      return {
        songs: [],
        nextPageToken: null
      }
    }
    const { nextPageToken } = pageParam ?? {}
    const basicPath = `${API_URL}/${songsPerChunk}/${filterText || EMPTY_FILTER_CHAR}`
    const { data, status } = await axios.get<PageParam>(nextPageToken ? `${basicPath}/${nextPageToken}` : basicPath)
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
    queryFn: ({ pageParam }) => fetchNextSongsChunk(pageParam, filterText),
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

  useEffect(() => {
    queryResult.remove()
    queryResult.refetch({ refetchPage: () => true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText])

  return { ...queryResult, fetchNextPage }
}
