import { iconButtonStyles } from '@/components/common'
import Link from 'next/link'
import { FaGoogleDrive } from 'react-icons/fa'
import styled from 'styled-components'

const GOOGLE_DRIVE_FOLDERS_LINK = 'https://drive.google.com/drive/u/0/folders'

interface Props {
  songId: string
}

export const GoogleDriveLink = ({ songId }: Props) => {
  const link = `${GOOGLE_DRIVE_FOLDERS_LINK}/${songId}`

  return (
    <IconLink href={link} size={48} target="_blank">
      <FaGoogleDrive size={32} />
    </IconLink>
  )
}

const IconLink = styled(Link)`
  ${iconButtonStyles}
`
