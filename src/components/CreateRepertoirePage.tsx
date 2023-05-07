import { Autocomplete, Page, PageContent, PageTitle, RepertoireItemLabel, RepertoireList, RepertoireListItem } from "@/components/common"
import { REPERTOIRE_ITEMS, REPERTOIRE_ITEM_NAMES } from "@/constants"
import { useCreateRepertoir } from "@/hooks"
import { Fragment } from "react"
import styled from "styled-components"

export const CreateRepertoirePage = () => {
  const { repertoire, removeSong, addSong } = useCreateRepertoir()

  return (
    <Page>
      <PageContent>
        <PageTitle>Stwórz repertuar</PageTitle>
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
      </PageContent>
    </Page>
  )
}

const ListItem = styled.li``
