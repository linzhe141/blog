'use client'
import Blog from '@/components/blog'
import { mdxOptions } from '@/components/mdx/mdxConfig'
import Editor from '@monaco-editor/react'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useRef, useState } from 'react'
import { MdxDisplay } from '../../components/mdx/mdxDisplay'
// import { initMonaco } from './env'
import { type editor } from 'monaco-editor'
import * as monacoInstance from 'monaco-editor/esm/vs/editor/editor.api'
import prettier from 'prettier/standalone'
type Monaco = typeof monacoInstance
export default function Page() {
  const [content, setContent] = useState<MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  > | null>(null)
  // useEffect(initMonaco, [])
  const monacoRef = useRef<Monaco | null>(null)

  function handleEditorWillMount(monaco: Monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    console.log('xxxxxxxx', monaco)
    // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    monaco.languages.registerDocumentFormattingEditProvider('markdown', {
      provideDocumentFormattingEdits(model) {
        const code = model.getValue()
        console.log('code', code)
        prettier
          .format(code, {
            semi: false,
            singleQuote: true,
            trailingComma: 'es5',
            tabWidth: 2,
            jsxSingleQuote: true,
            endOfLine: 'auto',
            // plugins: [parseMd],
            // parser: 'babel',
          })
          .then((res) => {
            model.setValue(res)
          })
        return []
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
    <div className='flex h-screen w-screen'>
      <Editor
        width='50%'
        defaultLanguage='markdown'
        defaultValue=''
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={async (value) => {
          const mdxSource = await serialize(value!, {
            mdxOptions: {
              ...mdxOptions,
              development: process.env.NODE_ENV === 'development',
            },
          })
          setContent(mdxSource)
        }}
      />
      <div className='flex-1 overflow-auto p-4'>
        <Blog>{content && <MdxDisplay source={content} />}</Blog>
      </div>
    </div>
  )
}
