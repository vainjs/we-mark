import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'
import { type FC, useState, useEffect, useMemo } from 'react'
import { appDataDir } from '@tauri-apps/api/path'
import DOMPurify from 'dompurify'
import { Splitter } from 'antd'
import { marked } from 'marked'
import Toolbar from '@/components/Toolbar'
import Preview from '@/components/Preview'
import Editor from '@/components/Editor'
import styles from './index.module.scss'

type LayoutProps = {
  theme?: string
}

const Layout: FC<LayoutProps> = (props) => {
  const { theme } = props

  const [markdown, setMarkdown] = useState<string>('# 欢迎使用微信公众号编辑器\n\n开始编写您的文章...')

  // 加载上次编辑的内容
  useEffect(() => {
    const loadLastContent = async () => {
      try {
        const dataDir = await appDataDir()
        const content = await readTextFile(`${dataDir}/last-content.md`)
        setMarkdown(content)
      } catch (err) {
        console.log('No saved content found')
      }
    }

    loadLastContent()
  }, [])

  // 自动保存内容
  useEffect(() => {
    const saveContent = async () => {
      try {
        const dataDir = await appDataDir()
        await writeTextFile(`${dataDir}/last-content.md`, markdown)
      } catch (err) {
        console.error('Error saving content:', err)
      }
    }

    const timer = setTimeout(saveContent, 2000)
    return () => clearTimeout(timer)
  }, [markdown])

  const html = useMemo(() => {
    const rawHtml = marked(markdown) as string
    console.log('=======rawHtml=========', rawHtml)
    return DOMPurify.sanitize(rawHtml)
  }, [markdown])

  return (
    <section className={styles.layout}>
      <header className={styles.header}>
        <h1>WeMark</h1>
        <Toolbar html={html} />
      </header>
      <main style={{ flex: 1 }}>
        <Splitter>
          <Splitter.Panel defaultSize='60%' min='30%' max='70%'>
            <Editor value={markdown} onChange={setMarkdown} />
          </Splitter.Panel>
          <Splitter.Panel>
            <Preview html={html} theme={theme} />
          </Splitter.Panel>
        </Splitter>
      </main>
    </section>
  )
}

export default Layout
