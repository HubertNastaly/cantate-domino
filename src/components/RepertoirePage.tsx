import { useRouter } from "next/router"
import { Page, PageContent, PageTitle, RepertoireList, RepertoireListItem } from "@/components/common"
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
        <PageTitle>Repertuar</PageTitle>
        <RepertoireList>
          {parsedConfig.map(([label, songId], idx) => (
            <RepertoireListItem
              key={`${songId}-${idx}`}
              label={label}
              song={repertoire?.[label]}
              onRemove={() => null}
            />
          ))}
        </RepertoireList>
      </PageContent>
    </Page>
  )
}
