import { useAudio } from "@/hooks"
import { COLORS } from "@/utils/colors"
import { formatTime } from "@/utils/formatTime"
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from "react"
import { IoIosPause, IoIosPlay } from "react-icons/io"
import { MdForward5, MdReplay5 } from 'react-icons/md'
import styled, { css } from "styled-components"
import { bigShadow } from "./SongCard"

interface Props {
  className?: string
  fileUrl: string | undefined
}

export const AudioBar = ({ fileUrl, className }: Props) => {
  const {
    audioRef,
    play,
    pause,
    updateAudioTime,
    updateCurrentTime,
    shiftAudioTime,
    initAudio,
    isPlaying,
    currentTimePosition,
    audioDuration
  } = useAudio()

  const fastForward = useCallback(() => shiftAudioTime(5), [shiftAudioTime])
  const rewind = useCallback(() => shiftAudioTime(-5), [shiftAudioTime])

  const handleAudioTimeChange = useCallback((event: SyntheticEvent<HTMLAudioElement>) => {
    updateCurrentTime(event.currentTarget.currentTime)
  }, [updateCurrentTime])

  const handleSliderChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateAudioTime(Number(event.target.value))
  }, [updateAudioTime])

  useEffect(() => {
    const audioElement = audioRef.current
    if(!audioElement) {
      return
    }

    try {
      pause()
      audioElement.load()
    } catch (error) {
      console.error(error)
    }
  }, [fileUrl, audioRef, pause])

  const isDisabled = !fileUrl
  const timeTravelColor = isDisabled ? COLORS.disabled : COLORS.primary

  return (
    <Container className={className}>
      <Audio ref={audioRef} hide={!fileUrl} onLoadedMetadata={initAudio} onTimeUpdate={handleAudioTimeChange}>
        {fileUrl && <source src={fileUrl} type="audio/mp3" />}
        <p>This browser does not support HTML5 audio</p>
      </Audio>
      <Controls>
        <TimetravelButton disabled={isDisabled} onClick={rewind}>
          <MdReplay5 color={timeTravelColor} size={48} />
        </TimetravelButton>
        <PlayButton onClick={isPlaying ? pause : play} disabled={isDisabled}>
          {isPlaying ? (
            <IoIosPause color={COLORS.background} size={48} />
          ) : (
            <IoIosPlay color={COLORS.background} size={48} />
          )}
        </PlayButton>
        <TimetravelButton disabled={isDisabled} onClick={fastForward}>
          <MdForward5 color={timeTravelColor} size={48} />
        </TimetravelButton>
      </Controls>
      <TimeIndicators>
        <TimeIndicator>{formatTime(currentTimePosition)}</TimeIndicator>
        <TimeIndicator>-{formatTime(audioDuration - currentTimePosition)}</TimeIndicator>
      </TimeIndicators>
      <Slider min={0} max={audioDuration} step={0.1} value={currentTimePosition} onChange={handleSliderChange} disabled={isDisabled} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.background};

  ${bigShadow}
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

const iconButtonStyles = css<{ disabled?: boolean }>`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const PlayButton = styled.button`
  ${iconButtonStyles}
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.disabled ? COLORS.disabled : COLORS.accent};
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

const TimeIndicator = styled.span``

const sliderStyles = css<{ disabled?: boolean }>`
  height: 100%;
  border: 1px solid ${props => props.disabled ? COLORS.disabled : COLORS.accent};
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

// TODO: update styles accross different browsers
const Slider = styled.input.attrs({ type: 'range' })`
  height: 48px;
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
