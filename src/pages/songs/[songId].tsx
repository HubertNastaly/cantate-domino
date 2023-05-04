import { AudioBar, Page, PageContent, QrCode, VoiceButtons } from "@/components";
import { SongCard } from "@/components/SongCard";
import { useSong } from "@/hooks";
import { Voice } from "@/types";
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
    <PageContentStyled>
      <Header>
        <SongCard song={data} small hideTitle />
        <Title>{name}</Title>
        <QrCodeStyled url={window.location.href} />
      </Header>
      <VoiceButtons
        voiceFiles={voiceFiles}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
      />
      <Gallery>
        {imageFiles.map((fileId, idx) => (
          <Image key={fileId} src={googleFileUrl(fileId)} alt={`Nuty do "${name}", strona ${idx + 1}`} />
        ))}
      </Gallery>
      <AudioBarStyled fileUrl={selectedVoiceFile} />
    </PageContentStyled>
  )
}

const GOOGLE_FILE_BASE_URL = 'https://docs.google.com/uc?export=open'

function googleFileUrl(fileId: string | undefined) {
  if(!fileId) {
    return undefined
  }
  return `${GOOGLE_FILE_BASE_URL}&id=${fileId}`
}

const PageContentStyled = styled(PageContent)`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  margin-left: 32px;
  margin-right: 16px;
`

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

const QrCodeStyled = styled(QrCode)`
  flex-shrink: 0;
`

const AudioBarStyled = styled(AudioBar)`
  padding: 8px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
`
