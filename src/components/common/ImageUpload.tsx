import React, { FC, useState, useCallback } from 'react'
import { Input, Upload, Modal, Button, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'
import * as Sentry from '@sentry/react'

import { log, eSet } from '../../utils'
import { ImageTools } from '../../tools/ImageTools'
import ProductImage from './ProductImage'
import { useAltIntl, Message } from '../../intlConfig'

const VALID_EXTENSIONS = ['png', 'jpg', 'jpeg']
const MAX_WIDTH = 500

type Props = {
  disabled?: boolean
  value?: string
  onChange?: (data: string) => void
  large?: boolean
}

const ImageUpload: FC<Props> = ({ disabled, value, onChange, large }) => {
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const intl = useAltIntl()

  const handleUpload = useCallback(
    (file) => {
      setLoading(true)
      const [, ext] = file.name.split('.')

      if (!ext || !VALID_EXTENSIONS.includes(ext)) {
        return message.error(
          intl.formatMessage({ id: 'imageupload.extensionError' })
        )
      }

      const storage = firebase.storage()
      const storageRef = storage.ref()
      const fileName = `${uuidv4()}.${ext}`

      ImageTools.asyncResize(file, {
        width: MAX_WIDTH,
        height: MAX_WIDTH,
      })
        .then((blob) => {
          const imageRef = storageRef.child(fileName)

          return imageRef.put(blob)
        })
        .then((snapshot) => {
          log({ snapshot })

          return storage.ref().child(fileName).getDownloadURL()
        })
        .then((fireBaseUrl) => {
          message.success(intl.formatMessage({ id: 'imageupload.success' }))
          onChange?.(fireBaseUrl)
        })
        .catch((e) => {
          Sentry.captureException(e)
          message.error(intl.formatMessage({ id: 'imageupload.error' }))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [onChange, intl]
  )

  return (
    <div
      className="flex justify-between items-center"
      style={{ minWidth: '200px' }}
    >
      <div className="flex flex-column flex-grow-1 mr2">
        <Input
          className="mr2"
          size={large ? 'large' : 'middle'}
          value={value}
          disabled={loading || disabled}
          onChange={onChange && eSet(onChange)}
        />
        <div className="flex justify-end mt2">
          <ImgCrop
            modalTitle={intl.formatMessage({ id: 'imageupload.editImage' })}
            modalCancel="Cancelar"
          >
            <Upload
              beforeUpload={(file) => {
                handleUpload(file)

                return false
              }}
            >
              <Button disabled={loading}>
                {loading ? <LoadingOutlined /> : <UploadOutlined />}
                {loading ? (
                  <Message id="imageupload.sending" />
                ) : (
                  <Message id="imageupload.upload" />
                )}
              </Button>
            </Upload>
          </ImgCrop>
        </div>
      </div>
      <div style={{ maxWidth: large ? '4.9rem' : '4rem' }}>
        <ProductImage src={value} title="" onClick={() => setModal(true)} />
      </div>
      <Modal
        title={<Message id="imageupload.newImage" />}
        footer={null}
        onCancel={() => setModal(false)}
        visible={modal}
      >
        <div className="flex justify-center">
          <img
            src={
              value ??
              'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png'
            }
            alt=""
          />
        </div>
      </Modal>
    </div>
  )
}

export default ImageUpload
