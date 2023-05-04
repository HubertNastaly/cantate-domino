import { Page, PageContent, SearchBar, Songs } from '@/components'
import { BREAKPOINT } from '@/constants'
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
        <title>Dwunastka</title>
        <meta name="description" content="Liturgical song book extended with each voice samples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: add icon */}
        {/* <link rel="icon" href="/favicon.ico" /> */} 
      </Head>
      <Page>
        <PageContentStyled ref={contentRef}>
          <Title>Dwunastka</Title>
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

const Title = styled.h1`
  margin-bottom: 0;
  text-align: center;
  font-size: 96px;
  font-weight: 300;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    font-size: 72px;
  }
`

const PageContentStyled = styled(PageContent)`
  display: flex;
  flex-direction: column;
  row-gap: 64px;
`
