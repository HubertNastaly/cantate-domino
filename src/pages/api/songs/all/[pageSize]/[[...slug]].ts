import { Song } from "@/types";
import { getDriveInstance } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const FOLDER_ID = '1FV1LKvEBpOfNS1_UtPnTgPfbs7T1I8O_'

interface SongsRequest extends NextApiRequest {
  query: {
    pageSize: string,
    slug: any
  }
}

interface SongsResponse {
  songs: Song[]
  nextPageToken: string | null
}

export default async function handler(req: SongsRequest, res: NextApiResponse<SongsResponse>) {
  const { pageSize, slug } = req.query
  const [pageToken] = slug ?? []

  const drive = getDriveInstance()
  const { data: { files = [], nextPageToken = null } } = await drive.files.list({
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    pageSize: Number(pageSize),
    pageToken,
    fields: 'nextPageToken, files(id, name)',
    q: `parents in "${FOLDER_ID}" and mimeType = "application/vnd.google-apps.folder"`,
    
  })

  res.status(200).send({
    songs: files as Song[],
    nextPageToken
  })
}