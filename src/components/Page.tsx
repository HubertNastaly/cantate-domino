import { BREAKPOINT } from '@/constants'
import styled from 'styled-components'

export const Page = styled.main`
  width: 100%;
`

export const PageContent = styled.div`
  margin: 0 auto;
  padding: 64px 16px;
  max-width: 1024px;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    padding-top: 16px;
  }
`