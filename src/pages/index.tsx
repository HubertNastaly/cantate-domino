import { Page, PageContent, SearchBar, Songs } from '@/components'
import { useElementWidth } from '@/hooks'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

export default function Home() {
  const [contentRef, contentWidth] = useElementWidth<HTMLDivElement>()
  const [searchPhrase, setSearch] = useState<string>('')

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
        <PageContentStyled ref={contentRef}>
          <SearchBar
            value={searchPhrase}
            onChange={setSearch}
          />
          {contentWidth && <Songs width={contentWidth} filterText={searchPhrase} />}
        </PageContentStyled>
      </Page>
    </>
  )
}

const PageContentStyled = styled(PageContent)`
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`
