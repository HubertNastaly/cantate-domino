import { clamp } from "@/utils/clamp"
import { useCallback, useRef, useState } from "react"

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const play = useCallback(() => {
    const audioElement = audioRef.current
    if(audioElement) {
      setIsPlaying(true)
      audioElement.play()
    }
  }, [audioRef, setIsPlaying])

  const pause = useCallback(() => {
    const audioElement = audioRef.current
    if(audioElement) {
      setIsPlaying(false)
      audioElement.pause()
    }
  }, [audioRef, setIsPlaying])

  const initAudio = useCallback(() => {
    const audioElement = audioRef.current
    if(audioElement) {
      setIsPlaying(true)
      setAudioDuration(audioElement.duration)
      audioElement.play()
    }
  }, [audioRef])

  const updateCurrentTime = useCallback((newTimePosition: number) => {
    const audioElement = audioRef.current
    if(audioElement) {
      setCurrentTimePosition(newTimePosition)
    }
  }, [audioRef])

  const updateAudioTime = useCallback((newTimePosition: number) => {
    const audioElement = audioRef.current
    if(audioElement) {
      audioElement.currentTime = newTimePosition
    }
  }, [audioRef])

  const shiftAudioTime = useCallback((delta: number) => {
    const audioElement = audioRef.current
    if(audioElement) {
      audioElement.currentTime = clamp(audioElement.currentTime + delta, [0, audioDuration])
    }
  }, [audioRef, audioDuration])

  return {
    play,
    pause,
    initAudio,
    updateCurrentTime,
    updateAudioTime,
    shiftAudioTime,
    isPlaying,
    currentTimePosition,
    audioRef,
    audioDuration
  }
}