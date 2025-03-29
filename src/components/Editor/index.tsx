import { type FC, useEffect, useRef } from 'react'
import { type ViewUpdate, highlightActiveLine } from '@codemirror/view'
import { bracketMatching } from '@codemirror/language'
import { minimalSetup, EditorView } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { useLatest } from '@vainjs/hooks'
import { clouds } from 'thememirror'
import styles from './index.module.scss'

type EditorProps = {
  onChange: (value: string) => void
  value: string
}

const baseTheme = EditorView.theme(
  {
    '&': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-scroller': {
      flex: '1 1 0',
      height: 0,
      padding: '6px',
      scrollbarWidth: 'thin',
      overflow: 'auto',
    },
  },
  { dark: false }
)

const noop = () => {}

const Editor: FC<EditorProps> = (props) => {
  const { value, onChange = noop } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useLatest(onChange)

  useEffect(() => {
    const view = new EditorView({
      parent: containerRef.current as HTMLDivElement,
      doc: value,
      extensions: [
        EditorView.lineWrapping,
        highlightActiveLine(),
        bracketMatching(),
        minimalSetup,
        markdown(),
        clouds,
        baseTheme,
        EditorView.updateListener.of((v: ViewUpdate) => {
          onChangeRef.current(v.state.doc.toString())
        }),
      ],
    })

    return () => {
      if (view) {
        view.destroy()
      }
    }
  }, [value])

  return <div ref={containerRef} className={styles.editor} />
}

export default Editor
