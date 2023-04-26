import { VoiceFiles } from "./voice"

export interface Song {
  id: string
  name: string
}

export interface SongDetailed extends Song {
  voiceFiles: VoiceFiles
}
