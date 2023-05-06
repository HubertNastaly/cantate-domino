import { useRouter } from "next/router";
import { useState } from "react";
import styled from 'styled-components'
import { SongCard, Page, PageContent } from "@/components/common";
import { BREAKPOINT } from "@/constants";
import { useSong } from "@/hooks";
import { Voice } from "@/types";
import { googleFileUrl } from "@/utils/googleFileUrl";
import { SongPageLoader } from "./SongPageLoader";
import { VoiceButtons } from "./VoiceButtons";
import { Gallery } from "./Gallery";
import { QrCode } from "./QrCode";
import { AudioBar } from "./AudioBar";

export function SongPage () {
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
    return <SongPageLoader songId={songId} />
  }
  
  const { voiceFiles, name, imageFiles, pdfFiles } = data
  const selectedVoiceFile = selectedVoice && googleFileUrl(voiceFiles[selectedVoice])

  return (
    <PageContentStyled>
      <Header>
        <SongCardStyled song={data} small hideTitle />
        <Title>{name}</Title>
        <QrCodeStyled url={window.location.href} />
      </Header>
      <VoiceButtons
        voiceFiles={voiceFiles}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
      />
      <Gallery imageFiles={imageFiles} songName={name} />
      <AudioBarStyled fileUrl={selectedVoiceFile} />
    </PageContentStyled>
  )
}

const PageContentStyled = styled(PageContent)`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding-bottom: 192px;
`

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

const QrCodeStyled = styled(QrCode)`
  flex-shrink: 0;
  order: 3;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    align-self: flex-end;
    order: -1;
  }
`

const AudioBarStyled = styled(AudioBar)`
  padding: 16px 8px 8px 8px;
  box-sizing: border-box;
  position: fixed;
  z-index: 3;
  bottom: 0;
  left: 0;
`
