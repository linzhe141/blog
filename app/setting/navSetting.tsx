import { useState, useEffect } from 'react'
import message from '@/components/message'
import { useStore } from '@/store/store'
import { useImmer } from 'use-immer'
import type { Result, NavData } from '@/types'
import Underline from '@/components/underline'
import Link from 'next/link'
import { getDefaultUrl } from '@/utils'
import Header from '@/components/layout/header'
type Props = {
  setAuth: (value: boolean) => void
}
export default function NavSetting({ setAuth }: Props) {
  const navList = useStore((state) => state.navList)
  const setNavList = useStore((state) => state.setNavList)
  const [treeData, setTreeData] = useImmer(navList)

  const [disabled, setDisabled] = useState(false)

  function formatParams(
    data: TreeData[],
    result: { id: number; label: string }[] = []
  ) {
    for (const item of data) {
      result.push({ id: item.id, label: item.label })
      if (item.children.length) {
        formatParams(item.children, result)
      }
    }
    return result
  }
  async function submit() {
    setDisabled(true)
    const data: Result<boolean> = await (
      await fetch('/api/nav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('requestKey') ?? 'null',
        },
        body: JSON.stringify({
          data: formatParams(treeData as unknown as TreeData[]),
        }),
      })
    ).json()
    if (data.code === 401) {
      message({ type: 'error', text: data.msg! })
      setAuth(false)
    }
    if (data.data) {
      message({ type: 'success', text: '菜单目录修改成功！' })
      const data: Result<NavData[]> = await (await fetch('/api/nav')).json()
      setNavList(data.data)
    }
    setDisabled(false)
  }
  function setLabel(data: TreeData[], id: number, label: string) {
    for (const item of data) {
      if (item.id === id) {
        item.label = label
      }
      if (item.children.length) {
        setLabel(item.children, id, label)
      }
    }
  }
  function changeNameHandle(id: number, value: string) {
    setTreeData((draft) => {
      setLabel(draft as unknown as TreeData[], id, value)
    })
  }

  useEffect(() => {
    setTreeData(navList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navList])
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <Header>
        <Underline>
          <Link className='font-semibold' href={getDefaultUrl(navList) ?? ''}>
            blog
          </Link>
        </Underline>
      </Header>
      <div className='mb-4 text-lg font-semibold'>菜单配置</div>
      <div className='h-[600px] w-[400px] overflow-auto'>
        {treeData.map((item) => (
          <TreeNode
            id={item.id}
            key={item.id}
            label={item.label}
            level={0}
            children={item.children as unknown as TreeData[]}
            onChange={changeNameHandle}
          />
        ))}
      </div>
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
  )
}

type TreeData = {
  id: number
  label: string
  level: number
  children: TreeData[]
  onChange: (id: number, value: string) => void
}
function TreeNode({ id, label, children, level, onChange }: TreeData) {
  return (
    <div>
      <div className='flex items-center border-l border-slate-700 pb-2'>
        <div
          className='h-[1px] bg-slate-700'
          style={{ width: 20 + 20 * level + 'px' }}
        ></div>
        <input
          value={label}
          type='text'
          className='ml-2 flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-green-400 focus:outline-none'
          onChange={(e) => onChange(id, e.target.value)}
        ></input>
      </div>
      {children.map((item) => (
        <TreeNode
          {...item}
          key={item.id}
          level={level + 1}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
