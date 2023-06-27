import styled from 'styled-components'
import { Cover, SongCard, smallShadow } from '@/components/common'
import { rotate } from '@/utils/animations'

interface Props {
  songId: string
}

export const SongPageLoader = ({ songId }: Props) => {
  return (
    <Container>
      <SongCardAnimated
        song={{ id: songId, name: '' }}
        size="small"
        titlePlacement="none"
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

const SongCardAnimated = styled(SongCard)`
  animation: ${rotate} 2s ease-out infinite;

  & ${Cover} {
    ${smallShadow}
  }
`
