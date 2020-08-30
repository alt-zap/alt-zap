import React, { FC, useMemo } from 'react'
import { Form } from 'antd'
import slugify from 'slugify'
import { FormInstance } from 'antd/lib/form'

import { Message, IntlRules, prepareRules, useAltIntl } from '../../intlConfig'
import TextInputOriginal from '../common/TextInput'
import { forwardRef } from './products/ProductForm'
import { validateSlug, useTenantConfig } from '../../contexts/TenantContext'

const { Item } = Form

type Props = {
  disabled: boolean
  form: FormInstance
}

const TextInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof TextInputOriginal>
>(TextInputOriginal)

const intlRules: IntlRules = {
  slug: [
    {
      required: true,
      message: 'tenant.data.slugRequired',
    },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/g,
      message: 'tenant.data.slugPattern',
    },
  ],
}

const SlugFormItem: FC<Props> = ({ disabled, form }) => {
  const intl = useAltIntl()
  const { tenant } = useTenantConfig()
  const rules = useMemo(() => prepareRules(intlRules, intl), [intl])

  return (
    <Item
      label={<Message id="tenant.url" />}
      name="slug"
      rules={[
        ...rules.slug,
        () => ({
          async validator(_, value) {
            try {
              await validateSlug(value, tenant?.slug ?? '')
            } catch {
              return Promise.reject(
                intl.formatMessage({ id: 'tenant.invalidSlug' })
              )
            }
          },
        }),
      ]}
    >
      <TextInput
        disabled={disabled}
        addonAfter=".alt.app.br"
        onFocus={() => {
          const { name, slug } = form.getFieldsValue()

          if (name && !slug) {
            form.setFieldsValue({ slug: slugify(name, { lower: true }) })
          }
        }}
      />
    </Item>
  )
}

export default SlugFormItem
