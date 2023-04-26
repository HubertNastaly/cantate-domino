import { useCallback } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { SongDetailed } from "@/types"

const API_URL = `/api/songs`

export function useSong(songId: string) {
  const fetchSong = useCallback(async () => {
    const { data, status } = await axios.get<SongDetailed>(`${API_URL}/${songId}`)
    if(status === 200) {
      return data
    } else {
      throw new Error(`Response: ${status}`)
    }
  }, [songId])

  const queryResult = useQuery({
    queryKey: [`fetchSong-${songId}`],
    queryFn: fetchSong
  })

  return queryResult
}