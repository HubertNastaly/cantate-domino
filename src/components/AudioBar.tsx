import { COLORS } from "@/utils/colors"
import { useEffect, useRef, useState } from "react"
import { IoIosPause, IoIosPlay } from "react-icons/io"
import { MdForward5, MdReplay5 } from 'react-icons/md'
import styled, { css } from "styled-components"

interface Props {
  className?: string
  fileUrl: string | undefined
}

export const AudioBar = ({ fileUrl, className }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audioElement = audioRef.current
    if(!audioElement) {
      return
    }

    try {
      audioElement.pause()
      audioElement.load()
      setIsPlaying(true)
      audioElement.addEventListener('loadedmetadata', audioElement.play)
    } catch (error) {
      console.error(error)
    }
  }, [fileUrl, audioRef, setIsPlaying])

  return (
    <Container className={className}>
      <Audio ref={audioRef} controls hide={!fileUrl}>
        {fileUrl && <source src={fileUrl} type="audio/mp3" />}
        <p>This browser does not support HTML5 audio</p>
      </Audio>
      <Controls>
        <TimetravelButton>
          <MdReplay5 size={48} />
        </TimetravelButton>
        <PlayButton>
          {isPlaying ? (
            <IoIosPause color={COLORS.background} size={48} />
          ) : (
            <IoIosPlay color={COLORS.background} size={48} />
          )}
        </PlayButton>
        <TimetravelButton>
          <MdForward5 size={48} />
        </TimetravelButton>
      </Controls>
      <TimeIndicators>
        <TimePlayed>0:33</TimePlayed>
        <TimeLeft>-0:27</TimeLeft>
      </TimeIndicators>
      <Slider min={0} max={100} step={1} value={30} onChange={() => null} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Audio = styled.audio<{ hide?: boolean }>`
  width: 100%;
  display: ${({ hide }) => hide ? 'none' : 'block'};
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

const iconButtonStyles = css`
  padding: 0;
  border: none;
  cursor: pointer;
`

const PlayButton = styled.button`
  ${iconButtonStyles}
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${COLORS.accent};
`

const TimetravelButton = styled.button`
  ${iconButtonStyles}
  height: 48px;
  background: none;
`

const TimeIndicators = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const TimePlayed = styled.span`
  
`

const TimeLeft = styled.span`
  
`

const sliderStyles = css`
  height: 100%;
  border: 1px solid ${COLORS.accent};
  background: ${COLORS.background};
`

const progressStyles = css`
  height: 100%;
  background-color: ${COLORS.accent};
`

const thumbStyles = css`
  width: 16px;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
`

const Slider = styled.input.attrs({ type: 'range' })`
  height: 64px;
  width: 100%;

  // track

  &::-webkit-slider-runnable-track {
    ${sliderStyles}
  }

  &::-moz-range-track {
    ${sliderStyles}
  }

  &::-ms-track {
    ${sliderStyles}
  }

  // progress

  &::-moz-range-progress {
    ${progressStyles}
  }

  // thumb

  &::-moz-range-thumb {
    ${thumbStyles}
  }
`
