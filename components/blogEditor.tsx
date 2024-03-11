'use client'
import Editor from '@monaco-editor/react'
import { useRef, useState, useEffect } from 'react'
import { type editor } from 'monaco-editor'
import * as monacoInstance from 'monaco-editor/esm/vs/editor/editor.api'
import prettier from 'prettier/standalone'
import prettierrc from '../.prettierrc.json'
import { useToggleTheme } from '@/hooks/useToggleTheme'
type Monaco = typeof monacoInstance

interface Props {
  width: string | number
  renderMdx: (code: string) => void
}
export function BlogEditor({ width, renderMdx }: Props) {
  const [defaultValue, setDefaultValue] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const monacoRef = useRef<Monaco | null>(null)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const { theme: mode } = useToggleTheme()

  useEffect(() => {
    const hash = location.hash
    if (hash.indexOf('#') === 0) {
      const code = decodeURIComponent(escape(atob(hash.slice(1))))
      setDefaultValue(code)
      renderMdx(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    monacoRef.current = monaco
    editorRef.current = editor
  }
  function formatConent(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      if (editorRef.current) {
        editorRef.current.trigger(
          blogContent,
          'editor.action.formatDocument',
          {}
        )
      }
      e.preventDefault()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', formatConent)
    return () => {
      window.removeEventListener('keydown', formatConent)
    }
  }, [])
  return (
    <Editor
      width={width}
      defaultLanguage='markdown'
      defaultValue={defaultValue}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      theme={mode === 'light' ? 'light' : 'vs-dark'}
      onChange={(value) => {
        const base64 = btoa(unescape(encodeURIComponent(value!)))
        const url = 'editor#' + base64
        history.replaceState({}, '', url)
        setBlogContent(value!)
        renderMdx(value!)
      }}
    />
  )
}
