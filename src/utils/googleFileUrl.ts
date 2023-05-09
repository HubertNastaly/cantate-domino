const GOOGLE_FILE_BASE_URL = 'https://docs.google.com/uc?export=open'

export function googleFileUrl<T extends string | undefined>(fileId: T): T {
  if(!fileId) {
    return undefined as T
  }
  return `${GOOGLE_FILE_BASE_URL}&id=${fileId}` as T
}
