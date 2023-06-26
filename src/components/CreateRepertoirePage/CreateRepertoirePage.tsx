import {
  Autocomplete,
  BackButton,
  Page,
  PageContent,
  PageTitle,
  RepertoireItemLabel,
  RepertoireList,
  RepertoireListItem
} from "@/components/common"
import { BREAKPOINT, REPERTOIRE_ITEMS, REPERTOIRE_ITEM_NAMES } from "@/constants"
import { Fragment } from "react"
import styled from "styled-components"
import { ShareRepertoire } from "./ShareRepertoire"
import { useCreateRepertoire } from "@/providers"
import { Button } from "../common/Button"
import { COLORS } from "@/utils/colors"

export const CreateRepertoirePage = () => {
  const { repertoire, removeSong, addSong, clearRepertoire } = useCreateRepertoire()

  return (
    <Page>
      <PageContent>
        <Header>
          <BackButton />
          <PageTitle>Stwórz repertuar</PageTitle>
        </Header>
        <RepertoireList>
          {REPERTOIRE_ITEMS.map((item) => (
            <Fragment key={`repertoire-item-${item}`}>
              {repertoire[item] ? (
                <RepertoireListItem
                  label={REPERTOIRE_ITEM_NAMES[item]}
                  song={repertoire[item]}
                  onRemove={() => removeSong(item)}
                />
              ) : (
                <ListItem>
                  <RepertoireItemLabel>{REPERTOIRE_ITEM_NAMES[item]}</RepertoireItemLabel>
                  <Autocomplete onSelect={(song) => addSong(item, song)} />
                </ListItem>
              )}
            </Fragment>
          ))}
        </RepertoireList>
        <Buttons>
          <ShareRepertoireStyled repertoire={repertoire} />
          <ClearButton onClick={clearRepertoire}>Wyczyść</ClearButton>
        </Buttons>
      </PageContent>
    </Page>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media screen and (max-width: ${BREAKPOINT.mobile}px) {
    flex-direction: column;
    gap: 0;

    & button {
      align-self: flex-start;
    }
  }
`

const ListItem = styled.li``

const Buttons = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: ${BREAKPOINT.tablet}px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const ClearButton = styled(Button)`
  background: ${COLORS.background};
  color: ${COLORS.accent};
  border: 1px solid ${COLORS.accent};
`

const ShareRepertoireStyled = styled(ShareRepertoire)`
  width: 100%;
`
