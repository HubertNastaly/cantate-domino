import { Song } from "@/types"
import Link from "next/link"
import styled, { css } from "styled-components"
import { toSvg } from 'jdenticon'
import { COLORS } from "@/utils/colors"
import { CARD_SIZE } from "@/constants"

interface Props {
  song: Song
  small?: boolean
  clickable?: boolean
  titlePlacement?: 'bottom' | 'right' | 'none'
  className?: string
}

export const SongCard = ({ song: { id, name }, small, clickable, titlePlacement = 'bottom', className }: Props) => {
  const cardSize = small ? CARD_SIZE.small : CARD_SIZE.big
  const iconSize = 0.9 * cardSize

  const content = () => (
    <Content column={titlePlacement === 'bottom'}>
      <Cover size={cardSize} dangerouslySetInnerHTML={{ __html: toSvg(id, iconSize) }} />
      {titlePlacement !== 'none' && <Title>{name}</Title>}
    </Content>
  )

  return (
    <Container size={cardSize} className={className} clickable={clickable}>
      {clickable ? (
        <SongLink href={`/songs/${id}`}>
          {content()}
        </SongLink>
      ) : content()}
    </Container>
  )
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

const Title = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.primary};
`

const Container = styled.div<{ size: number, clickable?: boolean }>`
  width: ${props => props.size}px;
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
