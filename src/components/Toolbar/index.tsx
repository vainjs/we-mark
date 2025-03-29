import { type FC } from 'react'
import { Button, Select, Space } from 'antd'
import styles from './index.module.scss'

type ToolbarProps = {
  html: string
}

const Toolbar: FC<ToolbarProps> = (props) => {
  const { html } = props

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className={styles.toolbar}>
      <Space>
        <Select placeholder='代码主题' style={{ width: 120 }}>
          <Select.Option value='1'>1</Select.Option>
          <Select.Option value='2'>2</Select.Option>
          <Select.Option value='3'>3</Select.Option>
        </Select>
      </Space>
      <Space>
        <Button onClick={copyToClipboard}>复制</Button>
      </Space>
    </div>
  )
}

export default Toolbar
