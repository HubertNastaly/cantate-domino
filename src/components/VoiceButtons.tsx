import { BREAKPOINT } from "@/constants"
import { lato } from "@/fonts"
import { VOICES, Voice, VoiceFiles } from "@/types"
import { capitalize } from "@/utils/capitalize"
import { COLORS } from "@/utils/colors"
import { GiElephant, GiFeline, GiHummingbird, GiRooster } from "react-icons/gi"
import styled from "styled-components"

interface Props {
  voiceFiles: VoiceFiles
  selectedVoice: Voice | undefined
  onVoiceChange: (voice: Voice) => void
}

export const VoiceButtons = ({ selectedVoice, onVoiceChange, voiceFiles }: Props) => {
  return (
    <Container>
      {VOICES.map(voice => (
        <VoiceButton key={voice} onClick={() => onVoiceChange(voice)} disabled={!voiceFiles[voice]} selected={voice === selectedVoice}>
          <VoiceIcon voice={voice} />
          {capitalize(voice)}
        </VoiceButton>
      ))}
    </Container>
  )
}

const VOICE_ICON_SIZE = 48

const VoiceIcon = ({ voice }: { voice: Voice }) => {
  switch(voice) {
    case 'sopran':
      return <GiHummingbird size={VOICE_ICON_SIZE} />
    case 'alt':
      return <GiFeline size={VOICE_ICON_SIZE} />
    case 'tenor':
      return <GiRooster size={VOICE_ICON_SIZE} />
    case 'bas':
      return <GiElephant size={VOICE_ICON_SIZE} />
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;

  @media screen and (max-width: ${BREAKPOINT.tablet}px) {
    grid-template-columns: 1fr 1fr;
  }
`

const VoiceButton = styled.button<{ selected?: boolean }>`
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.selected ? COLORS.accent : COLORS.border};
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  font-family: ${lato.style.fontFamily};
  color: ${props => props.selected ? COLORS.accent : COLORS.primary};
  background-color: ${COLORS.background};

  transition: all 0.3s ease-out;

  &:hover {
    border-color: ${props => props.selected ? COLORS.accent : COLORS.primary};
  }
`