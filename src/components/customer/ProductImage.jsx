import React, { Fragment, useState } from 'react'
import { Modal } from 'antd'

export default ({ src, title }) => {
  const [modalOpened, setOpen] = useState(false)

  return (
    <Fragment>
      <div
        className="pointer dim"
        onClick={() => setOpen(true)}
        style={{ maxWidth: '4rem' }}
      >
        <img src={src} alt={title} title={title} className="br2" />
      </div>
      <Modal
        title={title}
        footer={null}
        onCancel={() => setOpen(false)}
        visible={modalOpened}
      >
        <div className="flex justify-center">
          <img src={src} alt={title} title={title} className="br2" />
        </div>
      </Modal>
    </Fragment>
  )
}
