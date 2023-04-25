import { Song } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useCallback } from "react"

interface PageParam {
  nextPageToken: string | null
  songs: Song[]
}

const SONGS_PER_CHUNK = 4
const API_URL = `/api/songs/${SONGS_PER_CHUNK}`

export const useSongs = () => {
  const fetchNextSongsChunk = useCallback(async (pageParam: PageParam | undefined): Promise<PageParam> => {
    const { nextPageToken } = pageParam ?? {}
    const { data, status } = await axios.get<PageParam>(nextPageToken ? `${API_URL}/${nextPageToken}` : API_URL)
    if(status === 200) {
      return {
        songs: data.songs,
        nextPageToken: data.nextPageToken
      }
    } else {
      throw new Error(`Response: ${status}`)
    }
  }, [])

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

  return queryResult
}
