import React, { FC, useState } from 'react'
import { SketchPicker } from 'react-color'

type Props = {
  value?: string
  onChange?: (data: string) => void
}

const ColorPicker: FC<Props> = ({ value, onChange }) => {
  const [opened, setOpen] = useState(false)

  return (
    <div>
      <div
        style={{
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(true)}
        onKeyUp={() => setOpen(true)}
        role="button"
        tabIndex={0}
      >
        <div
          style={{
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: value ?? '#006699',
          }}
        />
      </div>
      {opened && (
        <div
          style={{
            position: 'absolute',
            right: '10px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={() => {
              setOpen(false)
            }}
            onKeyUp={() => setOpen(false)}
            role="button"
            tabIndex={0}
          />
          <SketchPicker
            color={value}
            onChange={(color) => {
              onChange?.(color.hex)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
