import { RepertoireItem } from '@/types'

export function parseRepertoireConfig(configString: string) {
  const configComponents = configString.split('&')
  const configEntries = configComponents.map(component => component.split('=') as [RepertoireItem, string])
  return configEntries
}
