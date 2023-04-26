import { Song } from "@/types"
import styled from "styled-components"

interface Props {
  song: Song
}

export const SongCard = ({ song: { name } }: Props) => {
  return (
    <Container>
      <Cover />
      <Title>{name}</Title>
    </Container>
  )
}

const Container = styled.li`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  cursor: pointer;
`

const Cover = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;
`

const Title = styled.span`
  text-align: center
`