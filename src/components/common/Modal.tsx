import { ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '@/utils/colors'
import { useOutsideClick } from '@/hooks'

interface Props {
  trigger: (props: { onClick: () => void }) => JSX.Element
  children: ReactNode
  hideFrame?: boolean
}

export const Modal = ({ trigger: Trigger, children, hideFrame }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(modalRef, () => setIsModalOpened(false))

  const root = document.getElementById('__next')
  if(!root) {
    return null
  }

  return (
    <>
      <Trigger onClick={() => setIsModalOpened(isOpened => !isOpened)} />
      {isModalOpened && createPortal(
        <>
          <Shadow />
          <ModalWrapper ref={modalRef} hideFrame={hideFrame}>
            {children}
          </ModalWrapper>
        </>,
        root
      )}
    </>
  )
}

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
`

const scaleUp = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
  }

  to {
    transform: translate(-50%, -50%) scale(100%);
  }
`

const ModalWrapper = styled.div<{ hideFrame?: boolean }>`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${props => props.hideFrame ? 0 : 16}px;
  border-radius: 4px;
  background: ${props => props.hideFrame ? 'none' : COLORS.background};

  animation: ${scaleUp} 0.2s ease-out;
`
