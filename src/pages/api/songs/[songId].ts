import { VOICES, Voice, VoiceFiles } from "@/types";
import { getDriveInstance } from "@/utils/googleApi";
import { drive_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

type GoogleFiles = drive_v3.Schema$File[] | undefined

interface SongRequest extends NextApiRequest {
  query: {
    songId: string
  }
}

interface SongResponse {
  id: string
  name: string
  voiceFiles: VoiceFiles
  pdfUris: string[]
  imageFiles: string[]
}

export default async function handler(req: SongRequest, res: NextApiResponse<SongResponse>) {
  const { songId } = req.query

  const drive = getDriveInstance()

  const songPromise = drive.files.get({
    fileId: songId
  })

  const songFilesPromise = drive.files.list({
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: 'files(id, name)',
    q: `"${songId}" in parents`,
  })

  const [songResult, songFilesResult] = await Promise.all([songPromise, songFilesPromise])

  const { name } = songResult.data
  const { files } = songFilesResult.data

  if(!name) {
    return res.status(404)
  }

  const voiceEntries = VOICES.map((voice): [Voice, string | undefined] => [voice, getVoiceFileId(voice, files)])
  const voiceFiles = Object.fromEntries(voiceEntries) as VoiceFiles
  
  const pdfFiles = getFilesWithExtension(files, ['.pdf'])
  const imageFiles = getFilesWithExtension(files, ['.png', '.jpg'])

  const pdfsPromises = pdfFiles.map(({ id }) => (
    drive.files.get({
      fileId: id ?? undefined,
      alt: 'media'
    }, {
      responseType: 'arraybuffer'
    })
  ))

  const pdfs = await Promise.all(pdfsPromises)
  const pdfUris = pdfs.map(({ data }) => getBase64Uri(data as ArrayBuffer))

  // console.log({ pdfUris })

  // // const results = await Promise.all(
  // //   pdfFiles.map(fileId => (
  // //     drive.files.export({
  // //       fileId,
  // //       mimeType: 'application/pdf'
  // //     })
  // //   )
  // // ))

  res.status(200).send({
    id: songId,
    name,
    voiceFiles,
    pdfUris,
    imageFiles: imageFiles.map(({ id }) => id) as string[]
  })
}

function getVoiceFileId(voice: Voice, files: GoogleFiles) {
  return files?.find(({ name }) => name?.toLowerCase().includes(voice))?.id ?? undefined
}

function getFilesWithExtension(files: GoogleFiles, extensions: string[]) {
  const filesWithRequiredExtension = files?.filter(({ name }) => extensions.some(extension => name?.endsWith(extension))) ?? []
  return filesWithRequiredExtension.sort(compareFilesByName)
}

function compareFilesByName(fileA: drive_v3.Schema$File, fileB: drive_v3.Schema$File) {
  const fileAName = fileA.name ?? ''
  const fileBName = fileB.name ?? ''

  if(fileAName < fileBName) {
    return -1
  } else if (fileAName > fileBName) {
    return 1
  }

  return 0
}

function getBase64Uri(data: ArrayBuffer) {
  const base64 = Buffer.from(data).toString('base64')
  return `data:application/pdf;base64,${base64}`
}
