import styled, { keyframes } from "styled-components"
import { Modal } from "@/components/common"
import { BREAKPOINT } from "@/constants"
import { googleFileUrl } from "@/utils/googleFileUrl"
import { MdZoomIn } from "react-icons/md"
import { COLORS } from "@/utils/colors"
import { useState } from "react"
import { GiMusicalScore } from "react-icons/gi"
import { rotate } from "@/utils/animations"

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
      <ImagePlaceholder hidden={!isLoading}>
        <MusicScoreIcon color={COLORS.faded} size={48} />
      </ImagePlaceholder>
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

const ImagePlaceholder = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  display: ${props => props.hidden ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 1000px;
    height: 1000px;
    background: ${COLORS.faded};
    background: linear-gradient(${COLORS.faded} 0 45%, ${COLORS.background} 45%, ${COLORS.background} 55%, ${COLORS.faded} 55% 100%);

    animation: ${rotate} 5s linear infinite;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 2;
    width: calc(100% - 2px);
    height: 318px;
    background: ${COLORS.background};
  }
`

const MusicScoreIcon = styled(GiMusicalScore)`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
