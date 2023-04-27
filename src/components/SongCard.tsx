import { Song } from "@/types"
import Link from "next/link"
import styled from "styled-components"
import { toSvg } from 'jdenticon'
import { COLORS } from "@/utils/colors"
import { CARD_SIZE } from "@/constants"

const ICON_SIZE = 0.9 * CARD_SIZE

interface Props {
  song: Song
}

export const SongCard = ({ song: { id, name } }: Props) => {
  return (
    <Container>
      <SongLink href={`/songs/${id}`}>
        <Cover dangerouslySetInnerHTML={{ __html: toSvg(id, ICON_SIZE) }} />
        <Title>{name}</Title>
      </SongLink>
    </Container>
  )
}

const Cover = styled.div`
  width: ${CARD_SIZE}px;
  height: ${CARD_SIZE}px;

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

  -webkit-box-shadow: 6px 6px 21px -10px rgba(66, 68, 90, 1);
  -moz-box-shadow: 6px 6px 21px -10px rgba(66, 68, 90, 1);
  box-shadow: 6px 6px 21px -10px rgba(66, 68, 90, 1);
`

const Title = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.primary};
`

const Container = styled.li`
  width: ${CARD_SIZE}px;
  cursor: pointer;

  &:hover {
    & ${Cover} {
      -webkit-box-shadow: 2px 2px 21px -14px rgba(66, 68, 90, 1);
      -moz-box-shadow: 2px 2px 21px -14px rgba(66, 68, 90, 1);
      box-shadow: 2px 2px 21px -14px rgba(66, 68, 90, 1);
    }
  }
`

const SongLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  text-decoration: none;
`
