import { BREAKPOINT } from "@/constants"
import { lato } from "@/fonts"
import { useCopyToClipboard } from "@/hooks"
import { Repertoire } from "@/types"
import { COLORS } from "@/utils/colors"
import { generateRepertoireLink } from "@/utils/generateRepertoireLink"
import { HiLink } from 'react-icons/hi'
import styled from "styled-components"

interface Props {
  repertoire: Repertoire
}

export const ShareRepertoire = ({ repertoire }: Props) => {
  const link = generateRepertoireLink(repertoire)
  const { copyToClipboard, isCopied } = useCopyToClipboard(link)

  return (
    <Wrapper>
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
  margin-top: 64px;
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

const CopyLinkButton = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.accent};
  color: ${COLORS.background};
  font-family: ${lato.style.fontFamily};
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
`

const CopyIcon = styled(HiLink)`
  margin-left: 8px;
`
