import { clamp } from '@/utils/clamp'
import { useCallback, useRef, useState } from 'react'

export type AudioState = 'playing' | 'paused' | 'loading'

export function useAudio() {
  const [audioState, setAudioState] = useState<AudioState>('loading')
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const play = useCallback(() => {
    const audioElement = audioRef.current
    if(audioElement) {
      setAudioState('playing')
      audioElement.play()
    }
  }, [audioRef, setAudioState])

  const pause = useCallback(() => {
    const audioElement = audioRef.current
    if(audioElement) {
      setAudioState('paused')
      audioElement.pause()
    }
  }, [audioRef, setAudioState])

  const initAudio = useCallback(() => {
    const audioElement = audioRef.current
    if(audioElement) {
      setAudioDuration(audioElement.duration)
      audioElement.play()
    }
  }, [audioRef, setAudioDuration])

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
    audioState,
    setAudioState,
    currentTimePosition,
    audioRef,
    audioDuration
  }
}