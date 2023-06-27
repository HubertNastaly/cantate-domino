import styled, { keyframes } from 'styled-components'
import { MdZoomIn } from 'react-icons/md'
import { useState } from 'react'
import { FilePlaceholder, Modal } from '@/components/common'
import { BREAKPOINT } from '@/constants'
import { googleFileUrl } from '@/utils/googleFileUrl'
import { COLORS } from '@/utils/colors'

interface Props {
  songName: string
  imageFiles: string[]
}

export const Gallery = ({ imageFiles, songName }: Props) => {
  return (
    <Container>
      {imageFiles.map((fileId, idx) => (
        <Modal
          key={fileId}
          hideFrame
          trigger={({ onClick }) => (
            <ImageWrapper onClick={onClick}>
              <HoverLayer>
                <MdZoomIn size={48} color={COLORS.background} />
              </HoverLayer>
              <NotesImage
                fileId={fileId}
                name={songName}
                fileIndex={idx}
              />
            </ImageWrapper>
          )}
        >
          <NotesImage
            fileId={fileId}
            name={songName}
            fileIndex={idx}
            fullScreen
          />
        </Modal>
      ))}
    </Container>
  )
}

interface NotesImageProps {
  fileId: string
  fileIndex: number
  name: string
  fullScreen?: boolean
}

const NotesImage = ({ fileId, name, fileIndex, fullScreen }: NotesImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <FilePlaceholder hidden={!isLoading} />
      <Image src={googleFileUrl(fileId)} alt={`Nuty do "${name}", strona ${fileIndex + 1}`} fullScreen={fullScreen} onLoad={() => setIsLoading(false)} hidden={isLoading} />
    </>
  )
}

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.5;
  }
`

const HoverLayer = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: black;
    animation: ${fadeIn} 0.3s ease-out;
  }

  & svg {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 680px;
  max-width: 100%;
  max-height: 90vh;

  &:hover {
    & ${HoverLayer} {
      display: block;
    }
  }
`

const Image = styled.img<{ fullScreen?: boolean }>`
  width: ${props => props.fullScreen ? 'auto' : '100%' };
  height: ${props => props.fullScreen ? '100vh' : '100%' };

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    width: ${props => props.fullScreen ? '100vw' : '100%' };
    height: ${props => props.fullScreen ? 'auto' : '100%' };
  }

  filter: grayscale(100%);
  object-fit: contain;
`
