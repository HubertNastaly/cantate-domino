import { BREAKPOINT, PAGE_CONTENT_WIDTH } from '@/constants'
import styled from 'styled-components'

export const Page = styled.main`
  width: 100%;
`

export const PageContent = styled.div`
  margin: 0 auto;
  padding: 64px 16px;
  max-width: ${PAGE_CONTENT_WIDTH}px;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    padding-top: 16px;
  }
`

export const PageTitle = styled.h1`
  margin-bottom: 32px;
  font-size: 48px;
`
