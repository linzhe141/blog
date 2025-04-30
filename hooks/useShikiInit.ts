import { useEffect } from 'react'
import { Highlighter, createHighlighterCore } from 'shiki'
import { shikiTheme } from '@/components/mdx/codeTheme'
import { LANGUAGES } from '@/components/mdx/languages'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { useHighlighter } from '@/store/shikiStore'

export function useShikiInit() {
  const setHighlighter = useHighlighter((state) => state.setHighlighter)

  useEffect(() => {
    createHighlighterCore({
      themes: [shikiTheme],
      langs: [LANGUAGES.javascript.src(), LANGUAGES.tsx.src()],
      engine: createOnigurumaEngine(() => import('shiki/wasm')),
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter)
    })
  }, [setHighlighter])
}
