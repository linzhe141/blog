'use client'
import { useState, useEffect } from 'react'
import Auth from './auth'
import NavSetting from './navSetting'
export default function Setting() {
  const [auth, setAuth] = useState(true)

  async function checkStatus() {
    const data = await (
      await fetch('/api/requestKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: localStorage.getItem('requestKey') }),
      })
    ).json()
    setAuth(data.data)
  }

  useEffect(() => {
    checkStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex h-screen items-center justify-center'>
      {!auth ? <Auth setAuth={setAuth} /> : <NavSetting setAuth={setAuth} />}
    </div>
  )
}
