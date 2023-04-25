import { Page, PageContent } from '@/components/Page'
import { useSongs } from '@/hooks'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  const { songs, fetchNextSongsChunk } = useSongs()
  console.log({ songs })

  useEffect(() => {
    fetchNextSongsChunk()
  }, [])

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
          Hello world
          <button onClick={fetchNextSongsChunk}>Fetch more</button>
        </PageContent>
      </Page>
    </>
  )
}
