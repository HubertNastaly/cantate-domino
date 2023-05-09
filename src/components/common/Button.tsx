import { lato } from "@/fonts";
import { COLORS } from "@/utils/colors";
import styled from "styled-components";

export const Button = styled.button`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.accent};
  color: ${COLORS.background};
  font-family: ${lato.style.fontFamily};
  font-size: 18px;
  cursor: pointer;
`
