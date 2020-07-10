import React, { FC, useState, useCallback } from 'react'
import { Input, Upload, Modal, Button, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'

import { log, eSet } from '../../utils'
import { ImageTools } from '../../tools/ImageTools'
import ProductImage from './ProductImage'

const VALID_EXTENSIONS = ['png', 'jpg', 'jpeg']
const MAX_WIDTH = 500

type Props = {
  disabled?: boolean
  value: string
  onChange: (data: string) => void
}

const ImageUpload: FC<Props> = ({ disabled, value, onChange }) => {
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const handleUpload = useCallback(
    (file) => {
      setLoading(true)
      const [, ext] = file.name.split('.')

      if (!ext || !VALID_EXTENSIONS.includes(ext)) {
        return message.error('Envie um arquivo .png ou .jpg válido')
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
          message.success('Arquivo enviado com sucesso')
          onChange(fireBaseUrl)
        })
        .catch((e) => {
          log(e)
          message.error('Ocorreu um erro ao enviar sua imagem')
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [onChange]
  )

  return (
    <div
      className="flex justify-between items-center"
      style={{ minWidth: '200px' }}
    >
      <div className="flex flex-column flex-grow-1 mr2">
        <Input
          className="mr2"
          value={value}
          disabled={loading || disabled}
          onChange={eSet(onChange)}
        />
        <div className="flex justify-end mt2">
          <ImgCrop modalTitle="Edite a imagem" modalCancel="Cancelar">
            <Upload
              beforeUpload={(file) => {
                handleUpload(file)

                return false
              }}
            >
              <Button disabled={loading}>
                {loading ? <LoadingOutlined /> : <UploadOutlined />}
                {loading ? 'Enviando' : 'Upload'}
              </Button>
            </Upload>
          </ImgCrop>
        </div>
      </div>
      <div style={{ maxWidth: '4rem' }}>
        <ProductImage src={value} title="" onClick={() => setModal(true)} />
      </div>
      <Modal
        title="Nova Imagem"
        footer={null}
        onCancel={() => setModal(false)}
        visible={modal}
      >
        <div className="flex justify-center">
          <img src={value} alt="" />
        </div>
      </Modal>
    </div>
  )
}

export default ImageUpload
