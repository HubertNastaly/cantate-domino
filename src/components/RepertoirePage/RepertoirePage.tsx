import { useRouter } from "next/router"
import { Page, PageContent } from "@/components/common"
import { REPERTOIRE_ITEMS, RepertoireItem } from "@/types/repertoireConfig"
import styled from "styled-components"
import { RepertoireListItem } from "./RepertoireListItem"

const CONFIG_SCHEMA = REPERTOIRE_ITEMS.map(param => `${param}=.*`).join('&')
const CONFIG_REGEX = new RegExp(CONFIG_SCHEMA)

export const RepertoirePage = () => {
  const { query: { repertoireConfig } } = useRouter()

  if(typeof repertoireConfig !== 'string' || !CONFIG_REGEX.test(repertoireConfig)) {
    return <span>404</span>
  }

  return <Repertoire config={parseConfig(repertoireConfig)} />
}

function parseConfig(configString: string) {
  const configComponents = configString.split('&')
  const configEntries = configComponents.map(component => component.split('=') as [RepertoireItem, string])
  return configEntries
}

interface Props {
  config: [RepertoireItem, string][]
}

const Repertoire = ({ config }: Props) => {
  return (
    <Page>
      <PageContent>
        <Title>Repertuar</Title>
        <RepertoireList>
          {config.map(([label, songId], idx) => (
            <RepertoireListItem
              key={`${songId}-${idx}`}
              label={label}
              songId={songId}
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
  row-gap: 32px;
`

const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 48px;
`
