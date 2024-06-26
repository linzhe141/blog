const iconMap = {
  close: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 24}
      height={height ?? 24}
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
  menu: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 20}
      height={height ?? 20}
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
  triangle: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 16}
      height={height ?? 16}
      viewBox='0 0 24 24'
      className='fill-current'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8 4v16l8-8z' />
    </svg>
  ),
  arrow: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 20}
      height={height ?? 20}
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 24 24'
    >
      <path d='M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z'></path>
    </svg>
  ),
  github: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      fill={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'></path>
    </svg>
  ),
  copy: (color: string, width?: number, height?: number) => (
    <svg
      fill={color}
      aria-hidden='true'
      width={width ?? 16}
      height={height ?? 16}
      viewBox='0 0 16 16'
      version='1.1'
      data-view-component='true'
    >
      <path d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z'></path>
      <path d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z'></path>
    </svg>
  ),
  check: (color: string, width?: number, height?: number) => (
    <svg
      fill={color ?? 'rgba(74, 222, 128,1)'}
      aria-hidden='true'
      width={width ?? 16}
      height={height ?? 16}
      viewBox='0 0 16 16'
      version='1.1'
      data-view-component='true'
    >
      <path d='M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z'></path>
    </svg>
  ),
  sun: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 24 24'
    >
      <path d='M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z'></path>
      <path d='M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z'></path>
      <path d='M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z'></path>
      <path d='M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z'></path>
      <path d='M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z'></path>
      <path d='M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z'></path>
      <path d='M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z'></path>
      <path d='M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z'></path>
      <path d='M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z'></path>
    </svg>
  ),
  moon: (color: string, width?: number, height?: number) => (
    <svg
      width={width ?? 24}
      height={height ?? 24}
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 24 24'
    >
      <path d='M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z'></path>
    </svg>
  ),
  click: (color: string, width?: number, height?: number) => (
    <svg
      width={64}
      height={64}
      fill={color}
      viewBox='0 0 1024 1024'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M509.488762 407.210667l4.047238 1.462857 375.954286 146.968381a73.142857 73.142857 0 0 1-11.727238 139.727238l-4.242286 0.755809-130.852572 19.334096-13.458285 124.976762a73.142857 73.142857 0 0 1-136.728381 27.599238l-2.023619-3.974096-169.569524-355.815619a73.142857 73.142857 0 0 1 88.600381-101.034666z m-22.576762 69.583238l169.569524 355.815619 19.529143-181.248 186.831238-27.599238-375.954286-146.968381zM414.47619 170.666667c134.119619 0 242.95619 108.30019 243.809524 242.224762l-75.995428-29.720381a170.666667 170.666667 0 1 0-178.93181 201.630476l34.499048 72.387047c-7.704381 0.731429-15.481905 1.097143-23.381334 1.097143-134.656 0-243.809524-109.153524-243.809523-243.809524S279.82019 170.666667 414.47619 170.666667z'
        p-id='3348'
      ></path>
    </svg>
  ),
}
type Props = {
  type: keyof typeof iconMap
  color?: string
  width?: number
  height?: number
}
export default function Icon({ type, color = '', width, height }: Props) {
  return <div>{iconMap[type](color, width, height)}</div>
}
