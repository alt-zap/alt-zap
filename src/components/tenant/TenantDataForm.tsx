import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'antd'

import ImageUpload from '../common/ImageUpload'

const TenantDataForm: FC = () => {
  const { handleSubmit, control } = useForm({})

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <div className="flex flex-column">
        <section>
          <label htmlFor="name" className="f4 fw1">
            Nome do seu negócio
          </label>
          <Controller
            as={<Input size="large" />}
            name="name"
            id="name"
            control={control}
          />
        </section>
        <section className="mt3">
          <label htmlFor="slug" className="f4 fw1">
            URL da página
          </label>
          <Controller
            as={
              <Input size="large" addonBefore="https://alt-zap.vercel.app/" />
            }
            name="slug"
            id="slug"
            control={control}
          />
        </section>
        <div className="flex">
          <section className="mt3 w-50 mr2">
            <label htmlFor="whatsapp" className="f4 fw1">
              Número de WhatsApp
            </label>
            <Controller
              as={<Input size="large" />}
              name="whatsapp"
              id="whatsapp"
              control={control}
            />
          </section>
          <section className="mt3 w-50">
            <label htmlFor="instagram" className="f4 fw1">
              Instagram
            </label>
            <Controller
              as={<Input size="large" />}
              name="instagram"
              id="instagram"
              control={control}
            />
          </section>
        </div>
        <section className="mt3 ">
          <label htmlFor="logoSrc" className="f4 fw1">
            Logomarca
          </label>
          <Controller
            render={({ onChange, value }) => (
              <ImageUpload value={value} onChange={onChange} large />
            )}
            name="logoSrc"
            id="logoSrc"
            control={control}
          />
        </section>
        <section className="mt3 w-50">
          <label htmlFor="instagram" className="f4 fw1">
            Cor do Tema
          </label>
          <Controller
            as={<Input size="large" />}
            name="instagram"
            id="instagram"
            control={control}
          />
        </section>
        <button type="submit">Enviar</button>
      </div>
    </form>
  )
}

export default TenantDataForm
