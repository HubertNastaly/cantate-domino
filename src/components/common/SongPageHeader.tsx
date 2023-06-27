import styled from 'styled-components'
import { SongCard } from './SongCard'
import { QrCode } from './QrCode'
import { GoogleDriveLink } from './GoogleDriveLink'
import { BackButton } from './BackButton'
import { useDevice } from '@/hooks'
import { Song } from '@/types'

interface Props {
  song: Song
}

export const SongPageHeader = ({ song }: Props) => {
  const device = useDevice()

  return device === 'desktop' ? (
    <DesktopSongPageHeader song={song} />
  ) : (
    <MobileSongPageHeader song={song} />
  )
}

const DesktopSongPageHeader = ({ song }: Props) => {
  return (
    <Header>
      <BackButton />
      <SongCardStyled song={song} size="small" titlePlacement="none" />
      <Title>{song.name}</Title>
      <DesktopActions>
        <QrCode url={window.location.href} />
        <GoogleDriveLink songId={song.id} />
      </DesktopActions>
    </Header>
  )
}

const MobileSongPageHeader = ({ song }: Props) => {
  return (
    <MobileHeader>
      <TopRow>
        <BackButton />
        <MobileActions>
          <QrCode url={window.location.href} />
          <GoogleDriveLink songId={song.id} />
        </MobileActions>
      </TopRow>
      <SongCard song={song} size="small" titlePlacement="none" />
      <Title>{song.name}</Title>
    </MobileHeader>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MobileHeader = styled(Header)`
  flex-direction: column;
  text-align: center;
`

const SongCardStyled = styled(SongCard)`
  margin-left: 32px;
`

const Title = styled.h1`
  margin: 0 16px;
`

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Actions = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: 8px;
`

const DesktopActions = styled(Actions)`
  margin-left: auto;
`

const MobileActions = styled(Actions)`
  align-self: flex-end;
`
