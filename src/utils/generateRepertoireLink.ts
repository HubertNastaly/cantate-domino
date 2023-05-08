import { REPERTOIRE_ITEMS } from "@/constants";
import { Repertoire } from "@/types";

export function generateRepertoireLink(repertoire: Repertoire) {
  if(typeof window === 'undefined') {
    return ''
  }
  const { origin } = window.location
  const repertoireConfig = REPERTOIRE_ITEMS.map(item => `${item}=${repertoire[item]?.id ?? ''}`).join('&')
  return `${origin}/repertoire/${repertoireConfig}`
}
