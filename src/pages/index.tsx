import { Songs } from '@/components'
import { Page, PageContent, SearchBar } from '@/components/common'
import { BREAKPOINT } from '@/constants'
import { useElementWidth } from '@/hooks'
import { COLORS } from '@/utils/colors'
import Head from 'next/head'
import Link from 'next/link'
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
          <Row>
            <SearchBar
              value={searchPhrase}
              onChange={setSearch}
            />
            <CreateRepertoireLink href="/repertoire/create">Stwórz repertuar</CreateRepertoireLink>
          </Row>
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

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const CreateRepertoireLink = styled(Link)`
  height: 100%;
  padding: 16px;
  flex-shrink: 0;
  text-decoration: none;
  background-color: ${COLORS.accent};
  color: ${COLORS.background};
  border-radius: 4px;
  font-size: 18px;
`
