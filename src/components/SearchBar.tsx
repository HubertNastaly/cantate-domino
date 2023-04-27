import { lato } from "@/fonts"
import { COLORS } from "@/utils/colors"
import styled from "styled-components"

interface Props {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <Input
      onChange={(event) => onChange(event.target.value)}
      value={value}
    />
  )
}

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #cccccc;
  font-size: 18px;
  font-family: ${lato.style.fontFamily};

  &:focus {
    border-color: ${COLORS.primary};
  }
`