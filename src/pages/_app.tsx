import type { AppProps } from 'next/app'
import './defaultStyles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lato } from '@/fonts'
import { CreateRepertoireProvider } from '@/providers'

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <style jsx global>{`
        html {
          font-family: ${lato.style.fontFamily};
        }
      `}</style>
      <CreateRepertoireProvider>
        <Component {...pageProps} />
      </CreateRepertoireProvider>
    </QueryClientProvider>
  )
}
