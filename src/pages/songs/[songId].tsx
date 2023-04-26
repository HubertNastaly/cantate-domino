import { Page, PageContent } from "@/components";
import { useSong } from "@/hooks";
import { useRouter } from "next/router";
import styled from 'styled-components'

export default function SongPage () {
  const { query: { songId } } = useRouter()

  if(typeof songId !== 'string') {
    return <span>404</span>
  }

  return (
    <Page>
      <SongPageContent songId={songId} />
    </Page>
  )
}

interface Props {
  songId: string
}

const SongPageContent = ({ songId }: Props) => {
  const { data } = useSong(songId)
  return (
    <PageContent>
      <Title>{data?.name}</Title>
    </PageContent>
  )
}

const Title = styled.h1`
  
`