import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Page, PageContent, SongPageHeader } from '../common'
import { useElementWidth, useMass } from '@/hooks'
import { SongPageLoader } from '../SongPage/SongPageLoader'
import { SongsView } from '../Songs'
import { Song } from '@/types'
import { BREAKPOINT } from '@/constants'

export function MassPage () {
  const { query: { songId } } = useRouter()

  if(typeof songId !== 'string') {
    return <span>404</span>
  }

  return (
    <Page>
      <MassPageContent songId={songId} />
    </Page>
  )
}

interface Props {
  songId: string
}

const MassPageContent = ({ songId }: Props) => {
  const [contentRef, contentWidth] = useElementWidth<HTMLDivElement>()
  const { data, isLoading } = useMass(songId)

  if(isLoading || !data) {
    return <SongPageLoader songId={songId} />
  }

  const { massFiles, name } = data

  const songs: Song[] = [
    { name: 'Kyrie', id: massFiles.kyrieId },
    { name: 'Sanctus', id: massFiles.sanctusId },
    { name: 'Agnus', id: massFiles.agnusId },
  ]

  return (
    <PageContentStyled ref={contentRef}>
      <SongPageHeader song={{ id: songId, name }} />
      {contentWidth && (
        <SongsView
          songs={songs}
          width={contentWidth}
        />
      )}
    </PageContentStyled>
  )
}

const PageContentStyled = styled(PageContent)`
  display: flex;
  flex-direction: column;
  row-gap: 64px;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    row-gap: 32px;
  }
`
