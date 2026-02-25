'use client'
import Editor from '@monaco-editor/react'
import { useRef, useState, useEffect } from 'react'
import { type editor } from 'monaco-editor'
import * as monacoInstance from 'monaco-editor'
import prettier from 'prettier/standalone'
import prettierrc from '../.prettierrc.json'
import { useToggleTheme } from '@/hooks/useToggleTheme'
type Monaco = typeof monacoInstance

interface Props {
  width: string | number
  onChangeCode: (code: string) => void
  code: string
}
export function BlogEditor({ width, onChangeCode, code }: Props) {
  const monacoRef = useRef<Monaco | null>(null)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const { theme: mode } = useToggleTheme()

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

  useEffect(() => {
    function formatConent(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        if (editorRef.current) {
          editorRef.current.trigger(code, 'editor.action.formatDocument', {})
        }
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', formatConent)
    return () => {
      window.removeEventListener('keydown', formatConent)
    }
  }, [code])
  return (
    <Editor
      width={width}
      defaultLanguage='markdown'
      defaultValue={code}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      theme={mode === 'light' ? 'light' : 'vs-dark'}
      onChange={(value) => {
        onChangeCode(value!)
      }}
    />
  )
}
