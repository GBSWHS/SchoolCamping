import { useEffect, useState } from 'react'

let IS_OFFLINE = false

const checkOffline = () =>
  new Promise<boolean>((resolve) =>
    fetch('/api/camping/health')
      .then((res) => resolve(res.status !== 404))
      .catch(() => resolve(true)))

const intervalFn = async () => {
  IS_OFFLINE = await checkOffline()
}

if (typeof window !== 'undefined') {
  intervalFn()
  setInterval(intervalFn, 10 * 1000)
}

const useOffline = () => {
  const [isOffline, setIsOffline] = useState(IS_OFFLINE)

  useEffect(() => {
    const i = setInterval(() =>
      setIsOffline(IS_OFFLINE))

    return () =>
      clearInterval(i)
  })

  return isOffline
}

export default useOffline
