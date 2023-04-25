import { Song } from "@/types"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const SONGS_PER_CHUNK = 3
const API_URL = `/api/songs/${SONGS_PER_CHUNK}`

export const useSongs = () => {
  const [nextPageToken, setNextPageToken] = useState<string|null>()
  const [songs, setSongs] = useState<Song[]>([])

  const fetchNextSongsChunk = useCallback(async () => {
    if(nextPageToken === null) {
      return
    }
    try {
      const response = await axios.get(nextPageToken ? `${API_URL}/${nextPageToken}` : API_URL)
      if(response.status === 200) {
        setSongs([...songs, ...response.data.songs])
        setNextPageToken(response.data.nextPageToken)
      }
    } catch (error) {
      console.error(error)
    }
  }, [nextPageToken, setSongs, setNextPageToken])

  const allSongsFetched = nextPageToken === null

  return { songs, fetchNextSongsChunk, allSongsFetched }
}
