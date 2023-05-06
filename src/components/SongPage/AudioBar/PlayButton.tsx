import { COLORS } from "@/utils/colors"
import { IoIosPause, IoIosPlay } from "react-icons/io"
import styled, { css } from "styled-components"
import { Spinner } from "@/components/common"
import { AudioState } from "@/hooks"

interface Props {
  state: AudioState
  onClick: () => void
  disabled?: boolean
}

export const PlayButton = ({ state, disabled, onClick }: Props) => {
  const isDisabled = disabled || state === 'loading'
  return (
    <Button onClick={onClick} disabled={isDisabled}>
      {state === 'loading' && <Spinner color={COLORS.background} size={48} />}
      {state === 'paused' && <IoIosPlay color={COLORS.background} size={48} />}
      {state === 'playing' && <IoIosPause color={COLORS.background} size={48} />}
    </Button>
  )
}

export const iconButtonStyles = css<{ disabled?: boolean }>`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const Button = styled.button`
  ${iconButtonStyles}
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.disabled ? COLORS.disabled : COLORS.accent};
`
