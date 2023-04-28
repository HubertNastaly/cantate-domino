import { useOutsideClick } from "@/hooks"
import { COLORS } from "@/utils/colors"
import { ReactNode, useRef, useState, HTMLProps } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

interface Props {
  trigger: (props: HTMLProps<HTMLButtonElement>) => JSX.Element
  children: ReactNode
}

export const Modal = ({ trigger: Trigger, children }: Props) => {
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
          <ModalWrapper ref={modalRef}>
            {children}
          </ModalWrapper>
        </>,
        root
      )}
    </>
  )
}

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  border-radius: 4px;
  background: ${COLORS.background};
`
