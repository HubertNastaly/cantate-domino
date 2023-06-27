import { useAudio } from '@/hooks'
import { COLORS } from '@/utils/colors'
import { formatTime } from '@/utils/formatTime'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo } from 'react'
import { MdForward5, MdReplay5 } from 'react-icons/md'
import styled, { css, keyframes } from 'styled-components'
import { bigShadow } from '@/components/common'
import { PAGE_CONTENT_WIDTH } from '@/constants'
import { PlayButton, iconButtonStyles } from './PlayButton'

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
    audioState,
    setAudioState,
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

  const handleDataLoaded = useCallback(() => setAudioState('playing'), [setAudioState])

  useEffect(() => {
    const audioElement = audioRef.current
    if(!audioElement) {
      return
    }

    try {
      pause()
      setAudioState('loading')
      audioElement.load()
    } catch (error) {
      console.error(error)
    }
  }, [fileUrl, audioRef, pause, setAudioState])

  const isDisabled = !fileUrl || audioState === 'loading'
  const timeTravelColor = isDisabled ? COLORS.disabled : COLORS.primary

  const formattedAudioDuration = useMemo(() => formatTime(audioDuration), [audioDuration])

  if(!fileUrl) {
    return null
  }

  return (
    <Container className={className}>
      <Content>
        <Audio ref={audioRef} hide={!fileUrl} onLoadedMetadata={initAudio} onLoadedData={handleDataLoaded} onTimeUpdate={handleAudioTimeChange}>
          {fileUrl && <source src={fileUrl} type="audio/mp3" />}
          <p>This browser does not support HTML5 audio</p>
        </Audio>
        <Controls>
          <TimetravelButton disabled={isDisabled} onClick={rewind}>
            <MdReplay5 color={timeTravelColor} size={48} />
          </TimetravelButton>
          <PlayButton
            state={audioState}
            onClick={audioState === 'playing' ? pause : play}
          />
          <TimetravelButton disabled={isDisabled} onClick={fastForward}>
            <MdForward5 color={timeTravelColor} size={48} />
          </TimetravelButton>
        </Controls>
        <TimeIndicators>
          <TimeIndicator>{formatTime(currentTimePosition)}</TimeIndicator>
          <TimeIndicator>{formattedAudioDuration}</TimeIndicator>
        </TimeIndicators>
        <Slider min={0} max={audioDuration} step={0.1} value={currentTimePosition} onChange={handleSliderChange} disabled={isDisabled} />
      </Content>
    </Container>
  )
}

const slideIn = keyframes`
  from {
    transform: translateY(256px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Container = styled.div`
  width: 100%;
  background-color: ${COLORS.background};

  ${bigShadow}

  animation: ${slideIn} 0.3s ease-out;
`

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${PAGE_CONTENT_WIDTH}px;
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
  box-sizing: border-box;
  background: ${COLORS.background};
`

const progressStyles = css`
  height: 100%;
  background-color: ${COLORS.accent};
`

const thumbStyles = css<{ disabled?: boolean }>`
  width: 8px;
  height: 100%;
  display: ${props => props.disabled ? 'none' : 'block'};
  box-sizing: border-box;
  border: 1px solid ${props => props.disabled ? COLORS.disabled : COLORS.accent};
  border-radius: 0;
  background: ${COLORS.background};
  cursor: grabbing;
`

// TODO: update styles accross different browsers
const Slider = styled.input.attrs({ type: 'range' })`
  height: 48px;
  width: 100%;
  overflow: hidden;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${thumbStyles}

    // progress for webkit
    box-shadow: -${PAGE_CONTENT_WIDTH}px 0 0 ${PAGE_CONTENT_WIDTH}px ${COLORS.accent};
  }

  &::-moz-range-thumb {
    ${thumbStyles}
  }

`
