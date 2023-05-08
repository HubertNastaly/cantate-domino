import { COLORS } from "@/utils/colors";
import styled, { css } from "styled-components";

export const iconButtonStyles = css<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  color: ${COLORS.primary};
  background: ${COLORS.faded};
  cursor: pointer;
`

export const IconButton = styled.button<{ size: number }>`
  ${iconButtonStyles}
`
