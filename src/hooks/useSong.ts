import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Mass, Song, SongDetailed } from '@/types'

const STALE_TIME = 5 * 60 * 1000 // 5 min

export function useSong(songId: string) {
  const songUrl = `/api/songs/${songId}`
  return useSongFromUrl<SongDetailed>(songId, songUrl)
}

export function useMass(songId: string) {
  const songUrl = `/api/songs/mass/${songId}`
  return useSongFromUrl<Mass>(songId, songUrl)
}

function useSongFromUrl<T extends Song>(songId: string, songUrl: string) {
  return useQuery({
    queryKey: [`fetchSong-${songId}`],
    queryFn: () => fetchSong<T>(songUrl),
    staleTime: STALE_TIME
  })
}

async function fetchSong<T>(songUrl: string) {
  const { data, status } = await axios.get<T>(songUrl)
  if(status === 200) {
    return data
  } else {
    throw new Error(`Response: ${status}`)
  }
}
