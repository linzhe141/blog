import nextMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import langNginx from 'highlight.js/lib/languages/nginx'
import langDockerfile from 'highlight.js/lib/languages/dockerfile'
/** @type {import('next').NextConfig} */
const nextConfig = {}
const languages = {
  nginx: langNginx,
  dockerfile: langDockerfile,
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypeHighlight,
        {
          ignoreMissing: true,
          languages,
        },
      ],
    ],
  },
})
export default withMDX(nextConfig)
