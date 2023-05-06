import { CARD_SIZE } from "@/constants"
import { Cover, bigShadow, smallShadow } from "@/components/common"
import styled, { keyframes } from 'styled-components'

interface Props {
  cardsInRow: number
}

export const LoaderRow = ({ cardsInRow }: Props) => {
  return (
    <>
      {[...new Array(cardsInRow)].map((_, idx) => (
        <AnimatedCover key={idx} size={CARD_SIZE.big} animationDelay={idx / 10} />
      ))}
    </>
  )
}

const pulseAnimation = keyframes`
  from {
    ${bigShadow}
  }

  to {
    ${smallShadow}
  }
`

const AnimatedCover = styled(Cover)<{ animationDelay: number }>`
  animation: ${pulseAnimation} 0.5s infinite;
  animation-direction: alternate;
  animation-delay: ${({ animationDelay }) => animationDelay}s;
`
