import { BREAKPOINT } from "@/constants"
import { Song } from "@/types"
import styled from "styled-components"
import { SongCard } from "./SongCard"
import { ReactNode } from "react"
import { QrCode } from "./QrCode"
import { GoogleDriveLink } from "./GoogleDriveLink"

interface Props {
  song: Song
}

export const SongPageHeader = ({ song }: Props) => {
  return (
    <Header>
      <SongCardStyled song={song} size="small" titlePlacement="none" />
      <Title>{song.name}</Title>
      <Actions>
        <QrCode url={window.location.href} />
        <GoogleDriveLink songId={song.id} />
      </Actions>
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    flex-direction: column;
    text-align: center;
  }
`

const SongCardStyled = styled(SongCard)`
  order: 0;
`

const Title = styled.h1`
  order: 1;
  margin-left: 32px;
  margin-right: 16px;
`

const Actions = styled.div`
  flex-shrink: 0;
  order: 3;

  display: flex;
  gap: 8px;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    align-self: flex-end;
    order: -1;
  }
`
