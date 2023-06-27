import { GiMusicalScore } from 'react-icons/gi';
import styled from 'styled-components';
import { rotate } from '@/utils/animations';
import { COLORS } from '@/utils/colors';

interface Props {
  hidden?: boolean
}

export const FilePlaceholder = ({ hidden }: Props) => (
  <Frame hidden={hidden}>
    <MusicScoreIcon color={COLORS.faded} size={48} />
  </Frame>
)

const MusicScoreIcon = styled(GiMusicalScore)`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  display: ${props => props.hidden ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 1000px;
    height: 1000px;
    background: ${COLORS.faded};
    background: linear-gradient(${COLORS.faded} 0 45%, ${COLORS.background} 45%, ${COLORS.background} 55%, ${COLORS.faded} 55% 100%);

    animation: ${rotate} 5s linear infinite;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 2;
    width: calc(100% - 2px);
    height: 318px;
    background: ${COLORS.background};
  }
`
