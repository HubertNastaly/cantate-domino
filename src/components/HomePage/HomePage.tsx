import styled from 'styled-components'
import Link from 'next/link'
import { BREAKPOINT } from '@/constants'
import { Page, PageContent, SearchBar } from '@/components/common'
import { Songs } from '@/components/Songs'
import { COLORS } from '@/utils/colors'
import { useElementWidth } from '@/hooks'
import { useSongsContext } from '@/providers'

export const HomePage = () => {
  const [contentRef, contentWidth] = useElementWidth<HTMLDivElement>()
  const { searchPhrase, setSearchPhrase } = useSongsContext()

  return (
    <Page>
      <PageContentStyled ref={contentRef}>
        <Title>Dwunastka</Title>
        <Row>
          <SearchBar
            value={searchPhrase}
            onChange={setSearchPhrase}
          />
          <CreateRepertoireLink href="/repertoire/create">Stwórz repertuar</CreateRepertoireLink>
        </Row>
        {contentWidth && <Songs width={contentWidth} filterText={searchPhrase} />}
      </PageContentStyled>
    </Page>
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

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
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
  text-align: center;
`
