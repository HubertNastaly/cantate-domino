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
  const voices = data?.voices ? Object.entries(data.voices) : []
  return (
    <PageContent>
      <Title>{data?.name}</Title>
      <ul>
        {voices.map(([voice, fileId]) => (
          <li key={fileId}>{voice}</li>
        ))}
      </ul>
      <Audio controls>
        <source src="https://docs.google.com/uc?export=open&id=1EVMte8TB24FXcayb_c3ISRPy99pAkd40" type="audio/mp3" />
        <p>This browser does not support HTML5 audio</p>
      </Audio>
    </PageContent>
  )
}

const Title = styled.h1`
  
`

const Audio = styled.audio`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`