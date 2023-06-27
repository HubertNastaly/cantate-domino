import styled from 'styled-components'
import { RiLoader5Fill } from 'react-icons/ri'
import { IconBaseProps } from 'react-icons'
import { rotate } from '@/utils/animations'

interface Props extends IconBaseProps {
  className?: string
}

export const Spinner = (props: Props) => (
  <AnimatedSpinner {...props} />
)

const AnimatedSpinner = styled(RiLoader5Fill)`
  animation: ${rotate} 1s linear infinite;
`
