'use client'
import { useState, useEffect } from 'react'
import Auth from './auth'
import MenuSetting from './menuSetting'
import { type Result } from '@/types'
import Skeleton from 'react-loading-skeleton'
export default function Setting() {
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  async function checkStatus() {
    setLoading(true)
    const data: Result<boolean> = await (
      await fetch('/api/requestKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: localStorage.getItem('requestKey') ?? 'null',
        }),
      })
    ).json()
    setLoading(false)
    setAuth(data.data)
  }

  useEffect(() => {
    checkStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='w-[400px]'>
            <Skeleton height={40} count={10} />
          </div>
        </div>
      ) : !auth ? (
        <div className='flex h-screen items-center justify-center'>
          <Auth setAuth={setAuth} />
        </div>
      ) : (
        <MenuSetting setAuth={setAuth} />
      )}
      {/* {!auth ? <Auth setAuth={setAuth} /> : <MenuSetting setAuth={setAuth} />} */}
    </div>
  )
}
