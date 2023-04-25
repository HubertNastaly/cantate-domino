import { useSongs } from "@/hooks"
import { Fragment } from "react"

export const Songs = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useSongs()
  const isDisabled = isFetchingNextPage || !hasNextPage

  return (
    <>
      <ul>
        {data?.pages.map(({ songs }, idx) => (
          <Fragment key={`page-${idx}`}>
            {songs.map(({ name, id }) => (
              <div key={id}>{name}</div>
            ))}
          </Fragment>
        ))}
      </ul>
      <button onClick={() => fetchNextPage()} disabled={isDisabled}>{isFetchingNextPage ? 'Loading...' : 'More'}</button>
      {!hasNextPage && <div>ALL CONTENT LOADED</div>}
    </>
  )
}