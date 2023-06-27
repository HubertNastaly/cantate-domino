import { VoiceFiles } from './voice'

export interface Song {
  id: string
  name: string
}

export interface SongDetailed extends Song {
  voiceFiles: VoiceFiles
  pdfUris: string[]
  imageFiles: string[]
}

export interface MassFiles {
  kyrieId: string
  sanctusId: string
  agnusId: string
}

export interface Mass extends Song {
  massFiles: MassFiles
}
