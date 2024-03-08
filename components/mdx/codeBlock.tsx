'use client'
import { useRef, useState } from 'react'
import Icon from '../icon/Icon'

type Props = {
  filename: string
  children: React.ReactNode
}
export default function CodeBlock({ filename, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  function copyHandle() {
    setCopied(true)
    navigator.clipboard.writeText(ref.current!.textContent!)
    window.setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <div className='relative'>
      {filename && (
        <div className='absolute left-6 top-2 cursor-pointer rounded p-1 text-xs italic text-[#abb2bf]'>
          <span className='mr-2'>filename:</span>
          {filename}
        </div>
      )}
      <div className=' absolute right-2 top-2 text-xs italic text-[#abb2bf]'>
        {getCodeLanguage(children)}
      </div>
      <div
        className='absolute bottom-2 right-2 cursor-pointer rounded bg-white p-1'
        onClick={copyHandle}
      >
        {!copied ? (
          <Icon type='copy' />
        ) : (
          <div className='relative'>
            <div className='absolute -left-16'>
              <div className='rounded bg-white px-1 text-xs italic text-green-400'>
                Copied!
              </div>
            </div>
            <Icon type='check' />
          </div>
        )}
      </div>
      <pre className={`${filename ?? 'pt-4'}`}>
        <div ref={ref}>{children}</div>
      </pre>
    </div>
  )
}
function getCodeLanguage(children: any) {
  const [_, language] = children?.props.className.split('language-')
  return language as string
}
