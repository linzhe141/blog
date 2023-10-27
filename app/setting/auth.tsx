import { useState } from 'react'
import message from '@/components/message'
import { type Result } from '@/types'
type Props = {
  setAuth: (value: boolean) => void
}
export default function Auth({ setAuth }: Props) {
  const [key, setKey] = useState('')
  const [disabled, setDisabled] = useState(true)
  async function submit() {
    setDisabled(true)
    const data: Result<boolean> = await (
      await fetch('/api/requestKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      })
    ).json()
    setAuth(data.data)
    if (!data.data) {
      message({ type: 'error', text: '访问key错误！' })
    } else {
      message({ type: 'success', text: '认证成功！' })
      localStorage.setItem('requestKey', key)
    }
    setDisabled(false)
  }
  function inputChangeHandle(value: string) {
    setKey(value)
    setDisabled(value === '')
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-gray-300'>
      <div className='flex h-[200px] w-[500px] flex-col items-center justify-center rounded bg-slate-100'>
        <span className='mb-4 text-stone-900'>请输入访问key</span>
        <input
          value={key}
          type='text'
          className='w-[400px] rounded-lg border border-gray-300 px-4 py-2 focus:border-green-400 focus:outline-none'
          onChange={(e) => inputChangeHandle(e.target.value)}
        ></input>
        <button
          onClick={submit}
          type='button'
          disabled={disabled}
          className={`mt-4 rounded-lg bg-green-400 px-4 py-2 text-white hover:bg-green-500 hover:shadow-green-400 focus:border-green-400 focus:outline-none
              ${disabled ? 'disabled disabled:cursor-not-allowed' : ''}`}
        >
          提交
        </button>
      </div>
    </div>
  )
}
