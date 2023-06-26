import { useRouter } from 'next/router'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { RectangleIconButton } from "./IconButton"

export const BackButton = () => {
  const { back } = useRouter()

  return (
    <RectangleIconButton size={48} onClick={back}>
      <IoChevronBackCircleSharp size={32} />
    </RectangleIconButton>
  )
}
