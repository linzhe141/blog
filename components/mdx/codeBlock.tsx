'use client'
import { useRef, useState } from 'react'
import Icon from '../icon/Icon'
import { HighlightedCode } from './highlighted-code'
import { LANGUAGES } from '@/components/mdx/languages'
type Props = {
  filename: string
  language: string
  nowrapper: boolean
  code: string
}
export default function CodeBlock({
  filename,
  code,
  language,
  nowrapper,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  function copyHandle() {
    setCopied(true)
    navigator.clipboard.writeText(ref.current!.textContent!)
    window.setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  if (nowrapper) {
    return (
      <div className='pure-highling'>
        <HighlightedCode
          code={code}
          selectedLanguage={LANGUAGES[language] ?? LANGUAGES.javascript}
        ></HighlightedCode>
      </div>
    )
  }
  return (
    <div className='w-0 min-w-full rounded bg-[#2f2f2f]'>
      <div className='flex justify-between p-2 text-[#cdcdcd]'>
        <div>{language}</div>
        <div>{filename}</div>
        <div className='cursor-pointer rounded p-1' onClick={copyHandle}>
          {!copied ? (
            <Icon type='copy' color='#cdcdcd' />
          ) : (
            <div className='relative'>
              <div className='absolute -left-16 -top-1'>
                <pre className='rounded bg-[#f1f5f9] px-2 py-1 text-sm text-green-400 dark:bg-black'>
                  Copied!
                </pre>
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
