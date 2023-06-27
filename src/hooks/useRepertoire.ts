import { Repertoire } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback } from 'react'

const API_URL = '/api/repertoire'

export function useRepertoire(repertoireConfig: string) {
  const fetchRepertoire = useCallback(async () => {
    const { data, status } = await axios.get<Repertoire>(`${API_URL}?${repertoireConfig}`)
    if(status === 200) {
      return data
    } else {
      throw new Error(`Response: ${status}`)
    }
  }, [repertoireConfig])

  const queryResult = useQuery({
    queryKey: [`fetchRepertoire-${repertoireConfig}`],
    queryFn: fetchRepertoire
  })

  return queryResult
}
