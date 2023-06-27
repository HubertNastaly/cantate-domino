import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components'
import { SongPageLoader } from './SongPageLoader';
import { VoiceButtons } from './VoiceButtons';
import { Gallery } from './Gallery';
import { AudioBar } from './AudioBar';
import { PdfViewer } from './PdfViewer';
import { googleFileUrl } from '@/utils/googleFileUrl';
import { Voice } from '@/types';
import { useElementWidth, useSong } from '@/hooks';
import { Page, PageContent, SongPageHeader } from '@/components/common';

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
  const [pageContentRef, width] = useElementWidth<HTMLDivElement>()

  if(isLoading || !data) {
    return <SongPageLoader songId={songId} />
  }
  
  const { voiceFiles, name, imageFiles, pdfUris } = data
  const selectedVoiceFile = selectedVoice && googleFileUrl(voiceFiles[selectedVoice])

  return (
    <PageContentStyled ref={pageContentRef}>
      <SongPageHeader song={data} />
      <VoiceButtons
        voiceFiles={voiceFiles}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
      />
      <PdfViewer pdfUrls={pdfUris} width={width} />
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

const AudioBarStyled = styled(AudioBar)`
  padding: 16px 8px 8px 8px;
  box-sizing: border-box;
  position: fixed;
  z-index: 3;
  bottom: 0;
  left: 0;
`
