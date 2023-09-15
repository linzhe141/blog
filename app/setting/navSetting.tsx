import { useState, useEffect } from 'react'
import message from '@/components/message'
import { useStore } from '@/store/store'
import { useImmer } from 'use-immer'
type Props = {
  setAuth: (value: boolean) => void
}
export default function NavSetting({ setAuth }: Props) {
  const data = useStore((state) => state.navList) as unknown as TreeData[]
  const [navList, setNavList] = useImmer(data)

  const [disabled, setDisabled] = useState(false)

  function formatParams(data: TreeData[], result: any[] = []) {
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
    const data = await (
      await fetch('/api/nav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('requestKey') ?? '',
        },
        body: JSON.stringify({ data: formatParams(navList) }),
      })
    ).json()
    if (data.code === 401) {
      message({ type: 'error', text: data.msg })
      setAuth(false)
    }
    if (data.data) {
      message({ type: 'success', text: '菜单目录修改成功！' })
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
    setNavList((draft) => {
      setLabel(draft, id, value)
    })
  }
  useEffect(() => {
    setNavList(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-4 text-lg font-semibold'>菜单配置</div>
      <div className='w-[400px]'>
        {navList.map((item) => (
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
