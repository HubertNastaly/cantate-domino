import { COLORS } from "@/utils/colors";
import styled, { css } from "styled-components";

export const iconButtonStyles = css<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  min-width: ${props => props.size}px;
  min-height: ${props => props.size}px;
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

export const RectangleIconButton = styled.button<{ size: number }>`
  ${iconButtonStyles}
  border-radius: 8px;
`

export const RoundedIconButton = styled.button<{ size: number }>`
  border-radius: 50%;
  ${iconButtonStyles}
`
