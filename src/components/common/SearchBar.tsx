import { lato } from "@/fonts"
import { COLORS } from "@/utils/colors"
import { IoIosSearch } from 'react-icons/io'
import styled from "styled-components"

interface Props {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
}

export const SearchBar = ({ value, onChange, onFocus }: Props) => {
  return (
    <InputWrapper>
      <IoIosSearch color={COLORS.accent} size={16} />
      <Input
        placeholder="Szukaj pieśni"
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        value={value}
      />
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  column-gap: 4px;
  align-items: center;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${COLORS.faded};

  transition: border-color 0.3s ease-out;

  &:focus {
    border-color: ${COLORS.primary};
  }

  &:focus-within {
    border-color: ${COLORS.primary};
  }
`

const Input = styled.input`
  flex: 1;
  font-size: 18px;
  font-family: ${lato.style.fontFamily};
  border: none;

  &:focus {
    outline: none;
  }
`