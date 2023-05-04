const SECONDS_IN_MINUTE = 60

export function formatTime(time: number | undefined) {
  if(!time) {
    return '00:00'
  }
  const roundedTime = Math.ceil(time)
  const minutes = Math.floor(roundedTime / SECONDS_IN_MINUTE)
  const seconds = roundedTime % SECONDS_IN_MINUTE
  return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
}
