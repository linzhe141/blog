import { CSSProperties } from 'react'
import { createCssVariablesTheme } from './theme-css-variables'
export const FONTS = [
  'jetbrains-mono',
  'geist-mono',
  'ibm-plex-mono',
  'fira-code',
  'soehne-mono',
] as const

export type Font = (typeof FONTS)[number]

export const shikiTheme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--ray-',
  variableDefaults: {},
  fontStyle: true,
})

type ShikiSyntaxObject = {
  /* foreground is also used as caret color */
  foreground: string
  /* rest is optional as syntax might come from a textmate source */
  constant?: string
  string?: string
  comment?: string
  keyword?: string
  parameter?: string
  function?: string
  stringExpression?: string
  punctuation?: string
  link?: string
  number?: string
  property?: string
  highlight?: string
  highlightBorder?: string
  highlightHover?: string
}

function convertToShikiTheme(syntaxObject: ShikiSyntaxObject): CSSProperties {
  if (!syntaxObject) {
    return {}
  }

  return {
    // '--ray-background': syntaxObject.background,
    '--ray-foreground': syntaxObject.foreground,
    '--ray-token-constant': syntaxObject.constant,
    '--ray-token-string': syntaxObject.string,
    '--ray-token-comment': syntaxObject.comment,
    '--ray-token-keyword': syntaxObject.keyword,
    '--ray-token-parameter': syntaxObject.parameter,
    '--ray-token-function': syntaxObject.function,
    '--ray-token-string-expression': syntaxObject.stringExpression,
    '--ray-token-punctuation': syntaxObject.punctuation,
    '--ray-token-link': syntaxObject.link,
    '--ray-token-number': syntaxObject.number,
    '--ray-token-property': syntaxObject.property,
    '--ray-highlight': syntaxObject.highlight,
    '--ray-highlight-border': syntaxObject.highlightBorder,
    '--ray-highlight-hover': syntaxObject.highlightHover,
  } as CSSProperties
}

export const THEME = {
  //TODO: 暂不使用light 主题
  light: convertToShikiTheme({
    // background: 'hsla(0, 0%, 93%,1)',
    foreground: 'hsla(0, 0%, 9%,1)',
    constant: 'oklch(53.18% 0.2399 256.9900584162342)',
    string: 'oklch(51.75% 0.1453 147.65)',
    comment: 'hsla(0, 0%, 40%,1)',
    keyword: 'oklch(53.5% 0.2058 2.84)',
    parameter: 'oklch(52.79% 0.1496 54.65)',
    function: 'oklch(47.18% 0.2579 304)',
    stringExpression: 'oklch(51.75% 0.1453 147.65)',
    punctuation: 'hsla(0, 0%, 9%,1)',
    link: 'oklch(51.75% 0.1453 147.65)',
    number: '#111111',
    property: 'oklch(53.18% 0.2399 256.9900584162342)',
    highlight: 'oklch(94.58% 0.0293 249.84870859673202)',
    highlightHover: 'oklch(94.58% 0.0293 249.84870859673202 / 30%)',
    highlightBorder: 'oklch(53.18% 0.2399 256.9900584162342)',
  }),
  dark: convertToShikiTheme({
    // background: 'hsla(0, 0%, 9%,1)',
    foreground: 'hsla(0, 0%, 93%,1)',
    constant: 'oklch(71.7% 0.1648 250.79360374054167)',
    string: 'oklch(73.1% 0.2158 148.29)',
    comment: 'hsla(0, 0%, 63%,1)',
    keyword: 'oklch(69.36% 0.2223 3.91)',
    parameter: 'oklch(77.21% 0.1991 64.28)',
    function: 'oklch(69.87% 0.2037 309.51)',
    stringExpression: 'oklch(73.1% 0.2158 148.29)',
    punctuation: 'hsla(0, 0%, 93%,1)',
    link: 'oklch(73.1% 0.2158 148.29)',
    number: '#ffffff',
    property: 'oklch(71.7% 0.1648 250.79360374054167)',
    highlight: 'oklch(30.86% 0.1022 255.21)',
    highlightHover: 'oklch(30.86% 0.1022 255.21 / 30%)',
    highlightBorder: 'oklch(71.7% 0.1648 250.79360374054167)',
  }),
}
