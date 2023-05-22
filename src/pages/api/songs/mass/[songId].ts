import { MassFiles } from "@/types"
import { fetchSong, getDriveInstance } from "@/utils/googleApi"
import { NextApiRequest, NextApiResponse } from "next"

interface SongRequest extends NextApiRequest {
  query: {
    songId: string
  }
}

interface SongResponse {
  id: string
  name: string
  massFiles: MassFiles
}

export default async function handler(req: SongRequest, res: NextApiResponse<SongResponse>) {
  const { songId } = req.query

  const drive = getDriveInstance()
  const { name, files = [] } = await fetchSong(drive, songId)

  if(!name) {
    return res.status(404)
  }

  const findFileByName = (fileName: string) => files.find(({ name }) => name?.toLowerCase().includes(fileName))?.id ?? ''

  const massFiles: MassFiles = {
    kyrieId: findFileByName('kyrie'),
    sanctusId: findFileByName('sanctus'),
    agnusId: findFileByName('agnus')
  }

  res.status(200).send({
    id: songId,
    name,
    massFiles
  })
}
