import type { MDXComponents } from 'mdx/types'
import { renderToString } from 'react-dom/server'
// This file is required to use MDX in `app :root` directory.

function generateId(children: React.ReactNode) {
  function Title({ children }: { children: React.ReactNode }) {
    return children
  }
  const text = renderToString(<Title>{children}</Title>)
  return text.replace(/<code>|<\/code>/g, '')
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 id={generateId(children)}>{children}</h1>,
    h3: ({ children }) => <h3 id={generateId(children)}>{children}</h3>,
    ...components,
  }
}
