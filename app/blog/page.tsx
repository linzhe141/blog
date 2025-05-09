import Underline from '@/components/underline'
import Link from 'next/link'
import filesInfo from '@/public/filesInfo.json'
export default async function Page() {
  const formatFilesInfo = filesInfo.map((i) => {
    const [type, rest] = i.path.split('/')
    const [year] = i.createdAt.split('-')

    return { ...i, type, rest, year }
  })

  const yearGroup: (typeof formatFilesInfo)[] = []
  formatFilesInfo.forEach((i) => {
    if (yearGroup.length === 0) {
      yearGroup.push([i])
    } else {
      const last = yearGroup.at(-1)!
      const target = last.find((el) => el.createdAt.includes(i.year))
      if (target) {
        last.push(i)
      } else {
        yearGroup.push([i])
      }
    }
  })
  return (
    <div className='flex-1 p-5 xl:mx-auto xl:w-1/2'>
      {yearGroup.map((yearItem) => (
        <div key={yearItem[0].createdAt} className='relative space-y-[100px]'>
          <span className='text-stroke absolute -top-[80px] text-[100px] font-bold italic text-[#1f2020] text-transparent opacity-10'>
            {yearItem[0].year}
          </span>
          <div className='space-y-8 opacity-80'>
            {yearItem.map((i) => (
              <Underline className='ml-4' key={i.path}>
                <Link className=' font-semibold' href={`/blog/${i.path}`}>
                  <span>{i.title}</span>
                  <span className='group ml-2 text-xs   '>
                    <span className='text-green-400 '>{i.type}</span>
                    {i.rest && (
                      <span className='text-green-100 opacity-50 group-hover:text-green-400 group-hover:opacity-80'>
                        /{i.rest}
                      </span>
                    )}
                  </span>
                </Link>
              </Underline>
            ))}
          </div>
        </div>
      ))}
      <div className='h-[100px]'></div>
    </div>
  )
}
