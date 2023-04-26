import { AudioBar, Page, PageContent } from "@/components";
import { useSong } from "@/hooks";
import { VOICES, Voice } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from 'styled-components'

const VOICE_FILE_BASE_URL = 'https://docs.google.com/uc?export=open'

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
  const [selectedVoice, setSelectedVoice] = useState<Voice|null>(null)

  if(isLoading || !data) {
    return <span>Loading...</span>
  }
  
  const { voiceFiles, name } = data
  const fileUrl = selectedVoice && `${VOICE_FILE_BASE_URL}&id=${voiceFiles[selectedVoice]}`

  return (
    <PageContent>
      <Title>{name}</Title>
      {VOICES.map(voice => (
        <button key={voice} onClick={() => setSelectedVoice(voice)} disabled={!voiceFiles[voice]}>{voice}</button>
      ))}
      <AudioBar fileUrl={fileUrl} />
    </PageContent>
  )
}

const Title = styled.h1``
