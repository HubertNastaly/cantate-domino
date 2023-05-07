import { EMPTY_FILTER_CHAR } from "@/constants"
import { Song } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useCallback, useEffect } from "react"

interface PageParam {
  nextPageToken: string | null
  songs: Song[]
}

const API_URL = `/api/songs/all`

export const useSongs = (songsPerPage: number = 0, filterText = '', onlyOnSearch = false) => {
  const fetchNextSongsChunk = useCallback(async (pageParam: PageParam | undefined, filterText: string): Promise<PageParam> => {
    if(songsPerPage === 0) {
      return {
        songs: [],
        nextPageToken: null
      }
    }
    const { nextPageToken } = pageParam ?? {}
    const basicPath = `${API_URL}/${songsPerPage}/${filterText || EMPTY_FILTER_CHAR}`
    const { data, status } = await axios.get<PageParam>(nextPageToken ? `${basicPath}/${nextPageToken}` : basicPath)
    if(status === 200) {
      return {
        songs: data.songs,
        nextPageToken: data.nextPageToken
      }
    } else {
      throw new Error(`Response: ${status}`)
    }
  }, [songsPerPage])

  const queryResult = useInfiniteQuery<PageParam>({
    queryKey: ['fetchSongs'],
    queryFn: ({ pageParam }) => fetchNextSongsChunk(pageParam, filterText),
    getNextPageParam: (lastPage) => {
      if(!lastPage.nextPageToken) {
        return false
      }
      return lastPage
    },
    enabled: !onlyOnSearch || !!filterText
  })

  const fetchNextPage = useCallback(() => {
    const { hasNextPage, fetchNextPage } = queryResult
    if(hasNextPage) {
      fetchNextPage()
    }
  }, [queryResult])

  useEffect(() => {
    if(onlyOnSearch && !filterText) {
      return
    }
    queryResult.remove()
    queryResult.refetch({ refetchPage: () => true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, onlyOnSearch])

  return { ...queryResult, fetchNextPage }
}
