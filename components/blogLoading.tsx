import Skeleton from 'react-loading-skeleton'
export default function BlogLoading() {
  return (
    <div>
      <h1>
        <Skeleton height={40} />
      </h1>
      <Skeleton count={25} />
    </div>
  )
}
