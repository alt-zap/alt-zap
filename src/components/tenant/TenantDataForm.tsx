import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'antd'

import ImageUpload from '../common/ImageUpload'
import ColorPicker from '../common/ColorPicker'

const TextInput = <Input size="large" className="fw1" />

const TenantDataForm: FC = () => {
  const { handleSubmit, control } = useForm({})

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <div className="flex flex-column">
        <section>
          <label htmlFor="name" className="f4 fw1">
            Nome do seu negócio
          </label>
          <Controller as={TextInput} name="name" id="name" control={control} />
        </section>
        <section className="mt3">
          <label htmlFor="slug" className="f4 fw1">
            URL da página
          </label>
          <Controller
            as={
              <Input
                size="large"
                className="fw1"
                addonBefore="https://alt-zap.vercel.app/"
              />
            }
            name="slug"
            id="slug"
            control={control}
          />
        </section>
        <div className="flex">
          <section className="mt3 w-50 mr2">
            <label htmlFor="whatsapp" className="f4 fw1">
              WhatsApp
            </label>
            <Controller
              as={TextInput}
              placeholder="ex: (83) 99934-2545"
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
              as={TextInput}
              placeholder="sem o @. ex: altzap"
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
        <section className="mt3 flex justify-between mb3">
          <label htmlFor="color" className="f4 fw1 mr2">
            Cor do Tema:
          </label>
          <Controller
            as={<ColorPicker />}
            name="color"
            id="color"
            control={control}
          />
        </section>
        <button type="submit">Enviar</button>
      </div>
    </form>
  )
}

export default TenantDataForm
