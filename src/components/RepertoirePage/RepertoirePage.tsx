import { useRouter } from "next/router"
import { Page, PageContent } from "@/components/common"
import styled from "styled-components"
import { RepertoireListItem } from "./RepertoireListItem"
import { REPERTOIRE_CONFIG_REGEX } from "@/constants"
import { parseRepertoireConfig } from "@/utils/parseRepertoireConfig"
import { useRepertoire } from "@/hooks"

export const RepertoirePage = () => {
  const { query: { repertoireConfig } } = useRouter()

  if(typeof repertoireConfig !== 'string' || !REPERTOIRE_CONFIG_REGEX.test(repertoireConfig)) {
    return <span>404</span>
  }

  return <Repertoire config={repertoireConfig} />
}

interface Props {
  config: string
}

const Repertoire = ({ config }: Props) => {
  const parsedConfig = parseRepertoireConfig(config)
  const { data: repertoire, isLoading } = useRepertoire(config)

  return (
    <Page>
      <PageContent>
        <Title>Repertuar</Title>
        <RepertoireList>
          {parsedConfig.map(([label, songId], idx) => (
            <RepertoireListItem
              key={`${songId}-${idx}`}
              label={label}
              song={repertoire?.[label]}
            />
          ))}
        </RepertoireList>
      </PageContent>
    </Page>
  )
}

const RepertoireList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 48px;
`
