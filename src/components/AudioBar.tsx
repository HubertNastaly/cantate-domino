import { useEffect, useRef } from "react"
import styled from "styled-components"

interface Props {
  fileUrl: string | undefined
}

export const AudioBar = ({ fileUrl }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audioElement = audioRef.current
    if(!audioElement) {
      return
    }

    try {
      audioElement.pause()
      audioElement.load()
      audioElement.addEventListener('loadedmetadata', audioElement.play)
    } catch (error) {
      console.error(error)
    }
  }, [fileUrl, audioRef])

  return (
    <Audio ref={audioRef} controls hide={!fileUrl}>
      {fileUrl && <source src={fileUrl} type="audio/mp3" />}
      <p>This browser does not support HTML5 audio</p>
    </Audio>
  )
}

const Audio = styled.audio<{ hide?: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: ${({ hide }) => hide ? 'none' : 'block'};
`
