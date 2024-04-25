import { useState, useEffect } from 'react'
import message from '@/components/message'
import { useMenuStore } from '@/store/menuStore'
import { useImmer } from 'use-immer'
import { type Result, MenuData } from '@/types'
import Underline from '@/components/underline'
import Link from 'next/link'
import { cn, getDefaultUrl } from '@/lib/utils'
import Header from '@/components/layout/header'
type Props = {
  setAuth: (value: boolean) => void
}
export default function MenuSetting({ setAuth }: Props) {
  const menuList = useMenuStore((state) => state.menuList)
  const setMenuList = useMenuStore((state) => state.setMenuList)
  const [treeData, setTreeData] = useImmer(menuList)

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
      await fetch('/api/menu', {
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
      const data: Result<MenuData[]> = await (await fetch('/api/menu')).json()
      setMenuList(data.data)
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
    setTreeData(menuList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuList])
  return (
    <div className='flex flex-col items-center justify-center'>
      <Header>
        <Underline>
          <Link className='font-semibold' href={getDefaultUrl(menuList) ?? ''}>
            blog
          </Link>
        </Underline>
      </Header>
      <div className='mx-auto mb-10 mt-[90px] flex flex-col items-center'>
        <div className='mb-4 text-lg font-semibold'>菜单配置</div>
        <div className='w-[400px] '>
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
          className={cn(
            'mt-4 w-20 px-4 py-2',
            'rounded-lg bg-green-400  text-white',
            'hover:bg-green-500 hover:shadow-green-400',
            'focus:border-green-400 focus:outline-none',
            {
              'disabled disabled:cursor-not-allowed': disabled,
            }
          )}
        >
          提交
        </button>
      </div>
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
          className='ml-2 flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-green-400 focus:outline-none dark:bg-black'
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
