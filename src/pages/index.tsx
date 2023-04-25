import { Page, PageContent } from '@/components/Page'
import { Songs } from '@/components/Songs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'

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
          <Songs />
        </PageContent>
      </Page>
    </QueryClientProvider>
  )
}
