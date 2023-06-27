import Link from 'next/link'
import styled, { css } from 'styled-components'
import { toSvg } from 'jdenticon'
import { Song } from '@/types'
import { COLORS } from '@/utils/colors'
import { CARD_SIZE } from '@/constants'
import { CardSize } from '@/types'

type TitlePlacement = 'bottom' | 'right' | 'none'

interface Props {
  song: Song
  size: CardSize
  clickable?: boolean
  titlePlacement?: TitlePlacement
  className?: string
}

export const SongCard = ({ song, size, clickable, titlePlacement = 'bottom', className }: Props) => {
  const { id, name } = song
  const cardSize = CARD_SIZE[size]
  const iconSize = 0.9 * cardSize

  const content = () => (
    <Content column={titlePlacement === 'bottom'}>
      <Cover size={cardSize} dangerouslySetInnerHTML={{ __html: toSvg(id, iconSize) }} />
      {titlePlacement !== 'none' && <Title titlePlacement={titlePlacement}>{name}</Title>}
    </Content>
  )

  return (
    <Container className={className} clickable={clickable} size={cardSize} titlePlacement={titlePlacement}>
      {clickable ? (
        <SongLink href={getSongLink(song)}>
          {content()}
        </SongLink>
      ) : content()}
    </Container>
  )
}

function getSongLink({ id, name }: Song) {
  const isMass = name.toLowerCase().includes('missa')
  return isMass ? `/songs/mass/${id}` : `/songs/${id}`
}

const Content = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  align-items: center;
  gap: 16px;
`

export const bigShadow = css`
  -webkit-box-shadow: 6px 6px 21px -10px rgba(66, 68, 90, 1);
  -moz-box-shadow: 6px 6px 21px -10px rgba(66, 68, 90, 1);
  box-shadow: 6px 6px 21px -10px rgba(66, 68, 90, 1);
`

export const smallShadow = css`
  -webkit-box-shadow: 2px 2px 21px -14px rgba(66, 68, 90, 1);
  -moz-box-shadow: 2px 2px 21px -14px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 21px -14px rgba(66, 68, 90, 1);
`

export const Cover = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  min-width: ${props => props.size}px;
  min-height: ${props => props.size}px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${COLORS.background};
  background: linear-gradient(215deg, rgba(255,255,255,1) 20%, rgba(244,244,244,1) 80%);
  border-radius: 8px;

  transition: all 0.3s ease-out;

  & path {
    fill: ${COLORS.accent};
  }
`

const Title = styled.span<{ titlePlacement: Exclude<TitlePlacement, 'none'> }>`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.primary};

  white-space: ${props => props.titlePlacement === 'right' ? 'nowrap' : 'wrap'};
  overflow: hidden;
  text-overflow: ellipsis;
`

const Container = styled.div<{ clickable?: boolean, titlePlacement: TitlePlacement, size: number }>`
  width: ${props => props.titlePlacement === 'right' ? '100%' : `${props.size}px`};
  cursor: ${props => props.clickable ? 'pointer' : 'unset'};

  & ${Cover} {
    ${bigShadow}
  }

  ${props => props.clickable ? `
    &:hover {
      & ${Cover} {
        ${smallShadow}
      }
    }
  ` : ''}
`

const SongLink = styled(Link)`
  text-decoration: none;
`
