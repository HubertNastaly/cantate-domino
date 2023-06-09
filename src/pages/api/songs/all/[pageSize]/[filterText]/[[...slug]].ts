import { NextApiRequest, NextApiResponse } from 'next';
import { EMPTY_FILTER_CHAR } from '@/constants';
import { Song } from '@/types';
import { getDriveInstance } from '@/utils/googleApi';

const FOLDER_ID = '1FV1LKvEBpOfNS1_UtPnTgPfbs7T1I8O_'
const GOOGLE_FOLDER_TYPE = 'application/vnd.google-apps.folder'

interface SongsRequest extends NextApiRequest {
  query: {
    pageSize: string,
    filterText: string,
    slug: any
  }
}

interface SongsResponse {
  songs: Song[]
  nextPageToken: string | null
}

export default async function handler(req: SongsRequest, res: NextApiResponse<SongsResponse>) {
  const { pageSize, filterText, slug } = req.query
  const [pageToken]: [string] = slug ?? []

  const drive = getDriveInstance()
  const { data: { files = [], nextPageToken = null } } = await drive.files.list({
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    pageSize: Number(pageSize),
    pageToken,
    fields: 'nextPageToken, files(id, name)',
    orderBy: 'name',
    q: getQuery(filterText),
  })

  res.status(200).send({
    songs: files as Song[],
    nextPageToken
  })
}

function getQuery(filterText: string) {
  const byFolderId = `parents in "${FOLDER_ID}"`
  const onlyFolders = `mimeType = "${GOOGLE_FOLDER_TYPE}"`
  const byFileName = (text: string) => `name contains "${text.toLowerCase()}"`

  return [
    byFolderId,
    onlyFolders,
    ...filterText !== EMPTY_FILTER_CHAR ? [byFileName(filterText)] : []
  ].join(' and ')
}
