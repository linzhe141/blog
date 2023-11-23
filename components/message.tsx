import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
type Props = {
  text: string
  type: 'success' | 'error'
}
const Message = ({ text, type }: Props) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => setShow(true), 100)
    setTimeout(() => {
      setShow(false)
      setTimeout(() => {
        const head = messageRootList.shift()
        document.body.removeChild(head!)
      }, 100)
    }, 2500)
  }, [])
  function getStyle() {
    return {
      top: show ? `${20 + (messageRootList.length - 1) * 60}px` : '-40px',
    }
  }
  return (
    <div
      style={getStyle()}
      className={`
        fixed left-1/2 z-[1000] -translate-x-1/2 
        ${type === 'success' ? 'bg-green-400' : 'bg-red-400'} 
        rounded-md bg-gray-200 p-2 text-white transition-all`}
    >
      {text}
    </div>
  )
}
const messageRootList: HTMLElement[] = []
const message = ({ text, type }: Props) => {
  const messageRoot = document.createElement('div')
  document.body.appendChild(messageRoot)
  messageRootList.push(messageRoot)
  const root = createRoot(messageRoot)
  root.render(<Message text={text} type={type} />)
}

export default message
