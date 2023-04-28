import { useRef, useState } from "react"
import styled from "styled-components"
import { MdQrCode } from "react-icons/md"
import { createPortal } from "react-dom"
import { QRCodeSVG } from 'qrcode.react'
import { COLORS } from "@/utils/colors"
import { useOutsideClick } from "@/hooks"

interface Props {
  url: string
}

// TODO: extract modal
export const QrCode = ({ url }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(modalRef, () => setIsModalOpened(false))

  const root = document.getElementById('__next')
  if(!root) {
    return null
  }

  return (
    <>
      <IconButton onClick={() => setIsModalOpened(isOpened => !isOpened)}>
        <MdQrCode size={32} />
      </IconButton>
      {isModalOpened && createPortal(
        <>
          <Shadow />
          <Modal ref={modalRef}>
            <QRCodeSVG size={256} value={url} />
          </Modal>
        </>,
        root
      )}
    </>
  )
}

const IconButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  background: #eeeeee;
  cursor: pointer;
`

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

const Modal = styled.div`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  border-radius: 4px;
  background: ${COLORS.background};
`
