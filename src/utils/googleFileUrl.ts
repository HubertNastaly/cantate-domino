const GOOGLE_FILE_BASE_URL = 'https://docs.google.com/uc?export=open'

export function googleFileUrl(fileId: string | undefined) {
  if(!fileId) {
    return undefined
  }
  return `${GOOGLE_FILE_BASE_URL}&id=${fileId}`
}
