import { RepertoireItem, Song } from "@/types";
import { getDriveInstance } from "@/utils/googleApi";
import { NextApiRequest, NextApiResponse } from "next";

interface RepertoireRequest extends NextApiRequest {
  query: Record<RepertoireItem, string>
}

interface RepertoireResponse {
  repertoire: Record<RepertoireItem, Song | undefined>
}

export default async function handler(req: RepertoireRequest, res: NextApiResponse<RepertoireResponse>) {
  const configEntries = Object.entries(req.query) as [RepertoireItem, string][]
  const drive = getDriveInstance()
  const songResponses = await Promise.all(configEntries.map(async ([repertoirItem, songId]) => [repertoirItem, songId ? await drive.files.get({ fileId: songId }) : undefined] as const))

  const success = songResponses.every(([_, response]) => response ? response.status === 200 : true)
  if(success) {
    const parsedResponse = songResponses.map(([repertoirItem, response]) => {
      const parsedSongResponse = response ? ({ id: response.data.id, name: response.data.name } as Song) : undefined
      return [repertoirItem, parsedSongResponse]
    })

    res.status(200).send(Object.fromEntries(parsedResponse))
  }

  res.status(500)
}
