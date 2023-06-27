import Head from 'next/head'
import { HomePage } from '@/components/HomePage'

export default function Home() {

  return (
    <>
      <Head>
        <title>Dwunastka</title>
        <meta name="description" content="Liturgical song book extended with each voice samples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: add icon */}
        {/* <link rel="icon" href="/favicon.ico" /> */} 
      </Head>
      <HomePage />
    </>
  )
}
