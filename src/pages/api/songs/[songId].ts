import { getDriveInstance } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

interface SongRequest extends NextApiRequest {
  query: {
    songId: string
  }
}

interface SongResponse {
  id: string
  name: string
}

export default async function handler(req: SongRequest, res: NextApiResponse<SongResponse>) {
  const { songId } = req.query

  const drive = getDriveInstance()

  const { data: { id, name } } = await drive.files.get({
    fileId: songId
  })

  if(!id || !name) {
    return res.status(404)
  }

  res.status(200).send({
    id,
    name
  })
}
