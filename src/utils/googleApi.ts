import { drive_v3, google } from 'googleapis'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } = process.env

export function getDriveInstance() {
  const client = new google.auth.OAuth2({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, redirectUri: GOOGLE_REDIRECT_URI })
  client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
  })
  
  return google.drive({ version: 'v3', auth: client })
}

export async function fetchSong(drive: drive_v3.Drive, songId: string) {
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

  return { name, files }
}
