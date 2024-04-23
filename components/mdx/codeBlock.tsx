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
    <div className='rounded bg-[#2f2f2f]'>
      <div className='flex justify-between p-2 text-[#cdcdcd]'>
        <div>{getCodeLanguage(children)}</div>
        <div>{filename}</div>
        <div className='cursor-pointer rounded p-1' onClick={copyHandle}>
          {!copied ? (
            <Icon type='copy' color='#cdcdcd' />
          ) : (
            <div className='relative'>
              <div className='absolute -left-16 -top-1'>
                <div className='rounded bg-white px-2 py-1 text-xs italic text-green-400'>
                  Copied!
                </div>
              </div>
              <Icon type='check' color='#cdcdcd' />
            </div>
          )}
        </div>
      </div>
      <pre className={'mt-0 rounded-none p-0'}>
        <div ref={ref}>{children}</div>
      </pre>
    </div>
  )
}
function getCodeLanguage(children: any) {
  if (!children.props.className) return ''
  const [_, language] = children.props.className?.split('language-')
  return language as string
}
