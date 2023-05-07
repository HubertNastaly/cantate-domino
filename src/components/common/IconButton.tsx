import { COLORS } from "@/utils/colors";
import styled from "styled-components";

export const IconButton = styled.button<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  background: ${COLORS.faded};
  cursor: pointer;
`
