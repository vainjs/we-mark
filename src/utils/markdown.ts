import { readTextFile } from '@tauri-apps/plugin-fs'
import { useEffect, useRef, useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

export function useMarkdown(markdown: string, theme = 'default') {
  const mdRef = useRef<MarkdownIt>()

  useEffect(() => {
    mdRef.current = new MarkdownIt({
      html: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code>${
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
            }</code></pre>`
          } catch (_) {}
        }
        return `<pre class="hljs"><code>${mdRef.current?.utils.escapeHtml(str)}</code></pre>`
      },
    })
  }, [])

  const loadThemeFile = async (theme: string) => {
    try {
      const text = await readTextFile(`../themes/${theme}.css`)
      console.log('========', text)
      return text
    } catch (error) {
      console.error('读取主题文件失败:', error)
      return ''
    }
  }

  return useMemo(() => {
    if (!mdRef.current) return ''
    const html = mdRef.current.render(markdown)
    return `
        <div class="we-mark-preview">
          <style>
            ${loadThemeFile(theme)}
          </style>
          ${html}
        </div>
      `
  }, [markdown, theme])
}
