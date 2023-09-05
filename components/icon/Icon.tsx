const iconMap = {
  close: (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      className='fill-current'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793Z'
      ></path>
    </svg>
  ),
  menu: (
    <svg
      width={20}
      height={20}
      viewBox='0 0 20 20'
      className='fill-current'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='2' y='7' width='11' height='2' fill='#606266'></rect>
      <rect x='2' y='11' width='14' height='2' fill='#606266'></rect>
      <rect x='2' y='15' width='8' height='2' fill='#606266'></rect>
      <rect x='2' y='3' width='16' height='2' fill='#606266'></rect>
    </svg>
  ),
  triangle: (
    <svg
      width={16}
      height={16}
      viewBox='0 0 24 24'
      className='fill-current'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8 4v16l8-8z' />
    </svg>
  ),
  arrow: (
    <svg
      width={20}
      height={20}
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 24 24'
    >
      <path d='M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z'></path>
    </svg>
  ),
  github: (
    <svg  width={24}
      height={24} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'></path>
    </svg>
  ),
}
type Props = {
  type: keyof typeof iconMap
}
export default function Icon({ type }: Props) {
  return <div>{iconMap[type]}</div>
}
