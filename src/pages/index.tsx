import { Page, PageContent, Songs } from '@/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import styled from 'styled-components'

export default function Home() {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  )
}

const SongsStyled = styled(Songs)`
  margin-top: 64px;
`
