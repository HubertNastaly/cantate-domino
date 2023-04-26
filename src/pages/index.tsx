import { Page, PageContent, Songs } from '@/components'
import Head from 'next/head'
import styled from 'styled-components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Cantate Domino</title>
        <meta name="description" content="Liturgical song book extended with each voice samples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: add icon */}
        {/* <link rel="icon" href="/favicon.ico" /> */} 
      </Head>
      <Page>
        <PageContent>
          <SongsStyled />
        </PageContent>
      </Page>
    </>
  )
}

const SongsStyled = styled(Songs)`
  padding: 64px 0;
`
