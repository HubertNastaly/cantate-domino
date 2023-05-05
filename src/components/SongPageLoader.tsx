import styled, { keyframes } from "styled-components"
import { Cover, SongCard, smallShadow } from "./SongCard"

interface Props {
  songId: string
}

export const SongPageLoader = ({ songId }: Props) => {
  return (
    <Container>
      <SongCardAnimated
        song={{ id: songId, name: '' }}
        small
        hideTitle
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`

const SongCardAnimated = styled(SongCard)`
  animation: ${rotate} 2s ease-out infinite;

  & ${Cover} {
    ${smallShadow}
  }
`
