import { BREAKPOINT } from "@/constants"
import { lato } from "@/fonts"
import { useCopyToClipboard } from "@/hooks"
import { Repertoire } from "@/types"
import { generateRepertoireLink } from "@/utils/generateRepertoireLink"
import { HiLink } from 'react-icons/hi'
import styled from "styled-components"
import { Button } from "@/components/common/Button"

interface Props {
  repertoire: Repertoire
  className?: string
}

export const ShareRepertoire = ({ repertoire, className }: Props) => {
  const link = generateRepertoireLink(repertoire)
  const { copyToClipboard, isCopied } = useCopyToClipboard(link)

  return (
    <Wrapper className={className}>
      <ShareLinkLabel>Udostępnij repertuar poprzez link</ShareLinkLabel>
      <CopyLinkButton onClick={copyToClipboard}>
        {isCopied ? 'Skopiowano' : (
          <>
            Skopiuj link
            <CopyIcon size={24} />
          </>
        )}
      </CopyLinkButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media screen and (max-width: ${BREAKPOINT.tablet}px) {
    flex-direction: column;
    gap: 16px;
  }
`

const ShareLinkLabel = styled.span`
  font-family: ${lato.style.fontFamily};
  font-size: 18px;
  white-space: nowrap;
`

const CopyLinkButton = styled(Button)`
  width: 100%;
  font-weight: 900;
`

const CopyIcon = styled(HiLink)`
  margin-left: 8px;
`
