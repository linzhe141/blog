import Skeleton from 'react-loading-skeleton'
export default function Loading() {
  return (
    <div>
      <h1>
        <Skeleton height={40} />
      </h1>
      <Skeleton count={25} />
    </div>
  )
}
