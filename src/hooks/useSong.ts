import { useCallback } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Mass, Song, SongDetailed } from '@/types'

export function useSong(songId: string) {
  const songUrl = `/api/songs/${songId}`
  return useSongFromUrl<SongDetailed>(songId, songUrl)
}

export function useMass(songId: string) {
  const songUrl = `/api/songs/mass/${songId}`
  return useSongFromUrl<Mass>(songId, songUrl)
}

function useSongFromUrl<T extends Song>(songId: string, songUrl: string) {
  const fetchSong = useCallback(async () => {
    const { data, status } = await axios.get<T>(songUrl)
    if(status === 200) {
      return data
    } else {
      throw new Error(`Response: ${status}`)
    }
  }, [songUrl])

  const queryResult = useQuery({
    queryKey: [`fetchSong-${songId}`],
    queryFn: fetchSong
  })

  return queryResult
}