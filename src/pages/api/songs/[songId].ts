import { VOICES, Voice, VoiceFiles } from "@/types";
import { getDriveInstance } from "@/utils/googleApi";
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
  voiceFiles: VoiceFiles
}

export default async function handler(req: SongRequest, res: NextApiResponse<SongResponse>) {
  const { songId } = req.query

  const drive = getDriveInstance()

  const songPromise = drive.files.get({
    fileId: songId
  })

  const voicesPromise = drive.files.list({
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: 'files(id, name)',
    q: `"${songId}" in parents`,
  })

  const [songResult, voicesResult] = await Promise.all([songPromise, voicesPromise])

  const { name } = songResult.data
  const { files } = voicesResult.data

  if(!name) {
    return res.status(404)
  }

  const voiceEntries = VOICES.map((voice): [Voice, string | undefined] => [voice, getVoiceFileId(voice, files)])
  const voiceFiles = Object.fromEntries(voiceEntries) as VoiceFiles

  res.status(200).send({
    id: songId,
    name,
    voiceFiles
  })
}

function getVoiceFileId(voice: Voice, files: drive_v3.Schema$File[] | undefined) {
  return files?.find(({ name }) => name?.toLowerCase().includes(voice))?.id ?? undefined
}
