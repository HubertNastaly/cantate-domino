export const VOICES = ['sopran', 'alt', 'tenor', 'bas'] as const
export type Voice = typeof VOICES[number]
export type Voices = Record<Voice, string | undefined>
