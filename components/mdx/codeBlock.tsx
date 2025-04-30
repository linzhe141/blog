'use client'
import { useRef, useState } from 'react'
import Icon from '../icon/Icon'
import { HighlightedCode } from './highlighted-code'
import { LANGUAGES } from '@/components/mdx/languages'
type Props = {
  filename: string
  language: string
  code: string
}
export default function CodeBlock({ filename, code, language }: Props) {
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
        <div>{language}</div>
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
      <div ref={ref} className={'mt-0 rounded-none p-0'}>
        <HighlightedCode
          code={code}
          selectedLanguage={LANGUAGES[language] ?? LANGUAGES.javascript}
        ></HighlightedCode>
      </div>
    </div>
  )
}
