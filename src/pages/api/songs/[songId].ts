import { VOICES, Voice, Voices } from "@/types";
import { getDriveInstance } from "@/utils";
import { drive_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

interface SongRequest extends NextApiRequest {
  query: {
    songId: string
  }
}

interface SongResponse {
  id: string
  name: string
  voices: Voices
}

export default async function handler(req: SongRequest, res: NextApiResponse<SongResponse>) {
  const { songId } = req.query

  const drive = getDriveInstance()

  const { data: { name } } = await drive.files.get({
    fileId: songId
  })

  // TODO: parallelize with the one above
  const { data: { files } } = await drive.files.list({
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: 'files(id, name)',
    q: `"${songId}" in parents`,
  })

  if(!name) {
    return res.status(404)
  }

  const voiceEntries = VOICES.map((voice): [Voice, string | undefined] => [voice, getVoiceFileId(voice, files)])
  const voices = Object.fromEntries(voiceEntries) as Voices

  res.status(200).send({
    id: songId,
    name,
    voices
  })
}

function getVoiceFileId(voice: Voice, files: drive_v3.Schema$File[] | undefined) {
  return files?.find(({ name }) => name?.toLowerCase().includes(voice))?.id ?? undefined
}
