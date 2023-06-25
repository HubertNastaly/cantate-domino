import { MdQrCode } from "react-icons/md"
import { QRCodeSVG } from 'qrcode.react'
import { Modal } from "./Modal"
import { RoundedIconButton } from "./IconButton"

interface Props {
  url: string
  className?: string
}

export const QrCode = ({ url, className }: Props) => {
  return (
    <Modal
      trigger={({ onClick }) => (
        <RoundedIconButton size={48} onClick={onClick} className={className}>
          <MdQrCode size={32} />
        </RoundedIconButton>
      )}
    >
      <QRCodeSVG size={256} value={url} />
    </Modal>
  )
}
