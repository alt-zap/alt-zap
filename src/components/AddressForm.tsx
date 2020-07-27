/* eslint-disable no-console */
import React, { FC, useCallback, Fragment } from 'react'
import { Button, Form } from 'antd'
import { Rule } from 'antd/lib/form'

import AutoFill from './AutoFill'
import AddressFields from './common/AddressFields'

type Props = {
  initialAddress?: Partial<Address>
  onAddress?: (data: Address) => void
  onValidSubmit?: (data: Address) => void
  loading?: boolean
}

const rules: Record<string, Rule[]> = {
  logradouro: [{ required: true, message: 'Preencha com o nome de sua rua' }],
  numero: [{ required: true, message: 'Obrigatório' }],
  bairro: [{ required: true, message: 'Preencha seu bairro' }],
  cidade: [{ required: true, message: 'Preencha sua cidade' }],
  estado: [{ required: true, message: 'Selecione seu estado' }],
}

/**
 *  Este componente tem licença poética para usar nomes em português
 *
 * TODO: onAddress precisa receber notificações de cada mudança de endereço
 */
const AddressForm: FC<Props> = ({
  onAddress,
  onValidSubmit,
  loading,
  initialAddress = {},
}) => {
  const [form] = Form.useForm()

  const handleAutoFill = useCallback(
    (data) => {
      const estado = data.uf
      const cidade = data.localidade

      form.setFieldsValue({ ...data, estado, cidade })
    },
    [form]
  )

  return (
    <Fragment>
      <AutoFill onAddress={handleAutoFill} />
      <Form
        form={form}
        layout="vertical"
        onFinish={(data) => onValidSubmit?.(data)}
        initialValues={initialAddress}
        onFieldsChange={(_, all) => {
          if (!onAddress) return

          const address = all.reduce(
            (acc, { name, value }) => ({
              ...acc,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              [(name as any)[0]]: value,
            }),
            {}
          )

          onAddress(address)
        }}
      >
        <div id="endereco" className="flex flex-column items-center mt2">
          <AddressFields rules={rules} />
          <Button
            loading={loading}
            size="large"
            type="primary"
            block
            htmlType="submit"
          >
            Salvar Endereço
          </Button>
        </div>
      </Form>
      <div />
    </Fragment>
  )
}

export default AddressForm
