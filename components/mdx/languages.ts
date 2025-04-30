export type Language = {
  name: string
  src: () => Promise<any>
}

export const LANGUAGES: { [index: string]: Language } = {
  bash: {
    name: 'Bash',
    src: () => import('shiki/langs/bash.mjs'),
  },
  shell: {
    name: 'Bash',
    src: () => import('shiki/langs/bash.mjs'),
  },
  css: {
    name: 'CSS',
    src: () => import('shiki/langs/css.mjs'),
  },
  diff: {
    name: 'Diff',
    src: () => import('shiki/langs/diff.mjs'),
  },
  dockerfile: {
    name: 'Docker',
    src: () => import('shiki/langs/dockerfile.mjs'),
  },
  graphql: {
    name: 'GraphQL',
    src: () => import('shiki/langs/graphql.mjs'),
  },
  go: {
    name: 'Go',
    src: () => import('shiki/langs/go.mjs'),
  },

  html: {
    name: 'HTML',
    src: () => import('shiki/langs/html.mjs'),
  },
  java: {
    name: 'Java',
    src: () => import('shiki/langs/java.mjs'),
  },
  js: {
    name: 'JavaScript',
    src: () => import('shiki/langs/javascript.mjs'),
  },

  javascript: {
    name: 'JavaScript',
    src: () => import('shiki/langs/javascript.mjs'),
  },

  json: {
    name: 'JSON',
    src: () => import('shiki/langs/json.mjs'),
  },
  jsx: {
    name: 'JSX',
    src: () => import('shiki/langs/jsx.mjs'),
  },

  markdown: {
    name: 'Markdown',
    src: () => import('shiki/langs/markdown.mjs'),
  },

  plaintext: {
    name: 'Plaintext',
    src: () => import('shiki/langs/javascript.mjs'),
  },

  prisma: {
    name: 'Prisma',
    src: () => import('shiki/langs/prisma.mjs'),
  },
  python: {
    name: 'Python',
    src: () => import('shiki/langs/python.mjs'),
  },
  rust: {
    name: 'Rust',
    src: () => import('shiki/langs/rust.mjs'),
  },

  scss: {
    name: 'SCSS',
    src: () => import('shiki/langs/scss.mjs'),
  },
  sql: {
    name: 'SQL',
    src: () => import('shiki/langs/sql.mjs'),
  },
  swift: {
    name: 'Swift',
    src: () => import('shiki/langs/swift.mjs'),
  },
  toml: {
    name: 'TOML',
    src: () => import('shiki/langs/toml.mjs'),
  },
  typescript: {
    name: 'TypeScript',
    src: () => import('shiki/langs/typescript.mjs'),
  },
  ts: {
    name: 'TypeScript',
    src: () => import('shiki/langs/typescript.mjs'),
  },
  tsx: {
    name: 'TSX',
    src: () => import('shiki/langs/tsx.mjs'),
  },
  vue: {
    name: 'Vue',
    src: () => import('shiki/langs/vue.mjs'),
  },
  xml: {
    name: 'XML',
    src: () => import('shiki/langs/xml.mjs'),
  },
  yaml: {
    name: 'YAML',
    src: () => import('shiki/langs/yaml.mjs'),
  },
  yml: {
    name: 'YAML',
    src: () => import('shiki/langs/yaml.mjs'),
  },
}
