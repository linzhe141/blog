'use client'
import Editor from '@monaco-editor/react'
import { useRef, useState, useEffect } from 'react'
import { type editor } from 'monaco-editor'
import * as monacoInstance from 'monaco-editor/esm/vs/editor/editor.api'
import prettier from 'prettier/standalone'
import prettierrc from '../.prettierrc.json'
type Monaco = typeof monacoInstance

interface Props {
  width: string | number
  renderMdx: (code: string) => void
}
export function BlogEditor({ width, renderMdx }: Props) {
  const [defaultValue, setDefaultValue] = useState('')
  const monacoRef = useRef<Monaco | null>(null)

  useEffect(() => {
    const hash = location.hash
    if (hash.indexOf('#') === 0) {
      const code = atob(hash.slice(1))
      setDefaultValue(code)
      renderMdx(code)
    }
  }, [])

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.registerDocumentFormattingEditProvider('markdown', {
      async provideDocumentFormattingEdits(model) {
        const code = model.getValue()
        const plugins = (await Promise.all([
          // import('prettier/plugins/acorn'),
          import('prettier/plugins/babel'),
          import('prettier/plugins/estree'),
          import('prettier/plugins/html'),
          import('prettier/plugins/markdown'),
          import('prettier/plugins/postcss'),
          import('prettier/plugins/typescript'),
          import('prettier/plugins/yaml'),

          // import('prettier-plugin-tailwindcss'),
          import('prettier/parser-markdown'),
        ])) as any[]
        const text = await prettier.format(code, {
          ...(prettierrc as any),

          plugins,
          // plugins: [prettierMarkdown],
          parser: 'mdx',
        })
        return [
          {
            range: model.getFullModelRange(),
            text,
          },
        ]
      },
    })
  }

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = monaco
  }

  return (
    <Editor
      width='50%'
      defaultLanguage='markdown'
      defaultValue={defaultValue}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      onChange={(value) => {
        const url = 'editor#' + btoa(value!)
        history.replaceState({}, '', url)
        renderMdx(value!)
      }}
    />
  )
}
