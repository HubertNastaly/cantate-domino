export const VOICES = ['sopran', 'alt', 'tenor', 'bas'] as const
export type Voice = typeof VOICES[number]
export type VoiceFiles = Record<Voice, string | undefined>
