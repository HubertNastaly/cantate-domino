import { AudioBar, Page, PageContent, QrCode } from "@/components";
import { useSong } from "@/hooks";
import { VOICES, Voice } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
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
  const { data, isLoading } = useSong(songId)
  const [selectedVoice, setSelectedVoice] = useState<Voice>()

  if(isLoading || !data) {
    return <span>Loading...</span>
  }
  
  const { voiceFiles, name, imageFiles, pdfFiles } = data
  const selectedVoiceFile = selectedVoice && googleFileUrl(voiceFiles[selectedVoice])

  return (
    <PageContent>
      <Title>{name}</Title>
      <QrCode url={'http://localhost:3000/songs/1TzuKPNeGFEx-owCFI-gUYJCdCem-GJja'} />
      {VOICES.map(voice => (
        <button key={voice} onClick={() => setSelectedVoice(voice)} disabled={!voiceFiles[voice]}>{voice}</button>
      ))}
      <Gallery>
        {imageFiles.map((fileId, idx) => (
          <Image key={fileId} src={googleFileUrl(fileId)} alt={`Nuty do "${name}", strona ${idx + 1}`} />
        ))}
      </Gallery>
      <AudioBar fileUrl={selectedVoiceFile} />
    </PageContent>
  )
}

const GOOGLE_FILE_BASE_URL = 'https://docs.google.com/uc?export=open'

function googleFileUrl(fileId: string | undefined) {
  if(!fileId) {
    return undefined
  }
  return `${GOOGLE_FILE_BASE_URL}&id=${fileId}`
}

const Title = styled.h1``

const Gallery = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const Image = styled.img`
  width: 680px;
  max-width: 100%;
  max-height: 90vh;
`
