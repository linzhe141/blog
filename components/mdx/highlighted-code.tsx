import React, { useEffect, useState } from 'react'

import { Language, LANGUAGES } from '@/components/mdx/languages'
import { useHighlighter } from '@/store/shikiStore'
import { THEME } from '@/components/mdx/codeTheme'

type PropTypes = {
  selectedLanguage: Language
  code: string
}

export const HighlightedCode: React.FC<PropTypes> = ({
  selectedLanguage,
  code,
}) => {
  const [highlightedHtml, setHighlightedHtml] = useState(
    `<pre class="preshiki css-variablesss" style="font-size: 15px; background-color: var(--ray-background);">${code}</pre>`
  )
  const highlighter = useHighlighter((state) => state.highlighter)
  const themeName = 'css-variables'

  useEffect(() => {
    const generateHighlightedHtml = async () => {
      if (!highlighter) return
      const loadedLanguages = highlighter.getLoadedLanguages() || []
      const hasLoadedLanguage = loadedLanguages.includes(
        selectedLanguage.name.toLowerCase()
      )

      if (!hasLoadedLanguage && selectedLanguage.src) {
        await highlighter.loadLanguage(selectedLanguage.src)
      }

      const lang = selectedLanguage.name.toLowerCase()

      const html = highlighter.codeToHtml(code, {
        lang: lang,
        theme: themeName,
      })
      setHighlightedHtml(html)
    }

    generateHighlightedHtml()
  }, [code, highlighter, selectedLanguage])

  return (
    <div
      className='highlight-wrapper'
      dangerouslySetInnerHTML={{
        __html: highlightedHtml,
      }}
      style={{ ...THEME.dark, fontSize: '15px' }}
    />
  )
}
