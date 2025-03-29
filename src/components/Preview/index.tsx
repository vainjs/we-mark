import { type FC, useState } from 'react'
import { Select } from 'antd'
import { DEVICE_PRESETS } from '@/enum'
import styles from './index.module.scss'

type DeviceSize = {
  name: string
  width: number
  height: number
}

type PreviewProps = {
  theme?: string
  html: string
}

const Preview: FC<PreviewProps> = (props) => {
  const { html, theme = 'default' } = props
  const [selectedDevice, setSelectedDevice] = useState<DeviceSize>(DEVICE_PRESETS[0])

  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <Select
          onChange={(value) => setSelectedDevice(DEVICE_PRESETS.find((device) => device.name === value)!)}
          value={selectedDevice.name}
          style={{ width: 120 }}
          size='small'
          options={DEVICE_PRESETS.map((device) => ({
            label: device.name,
            value: device.name,
          }))}
        />
      </div>
      <div className={styles['preview-wrapper']}>
        <div
          className={`${styles.preview} theme-${theme}`}
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ width: selectedDevice.width }}
        />
      </div>
    </div>
  )
}

export default Preview
