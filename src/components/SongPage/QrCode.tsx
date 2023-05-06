import styled from "styled-components"
import { MdQrCode } from "react-icons/md"
import { QRCodeSVG } from 'qrcode.react'
import { Modal } from "@/components/common"

interface Props {
  url: string
  className?: string
}

export const QrCode = ({ url, className }: Props) => {
  return (
    <Modal
      trigger={(props) => (
        <IconButton onClick={props.onClick} className={className}>
          <MdQrCode size={32} />
        </IconButton>
      )}
    >
      <QRCodeSVG size={256} value={url} />
    </Modal>
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
