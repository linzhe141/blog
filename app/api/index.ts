const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://blog-linzhe.vercel.app'
    : 'http://localhost:3000'

export function toUrl(url: string) {
  return baseUrl + url
}
