import styled from 'styled-components'
import { RiLoader5Fill } from 'react-icons/ri'
import { rotate } from '@/utils/animations'
import { IconBaseProps } from 'react-icons'

export const Spinner = (props: IconBaseProps) => (
  <AnimatedSpinner {...props} />
)

const AnimatedSpinner = styled(RiLoader5Fill)`
  animation: ${rotate} 1s linear infinite;
`
