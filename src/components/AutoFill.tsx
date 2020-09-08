import React, { FC, Fragment, useState, useCallback } from 'react'
import { Button, Typography } from 'antd'

import { eSet, log } from '../utils'
import CepInput from './CEPInput'
import { WorldAddress } from '../typings'
import { useAltIntl, Message } from '../intlConfig'

type Props = {
  onAddress: (data: Partial<WorldAddress>) => void
}

type ViaCepResponse = {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  ibge: string
  localidade: string
  logradouro: string
  uf: string
}

const AutoFill: FC<Props> = ({ onAddress }) => {
  const intl = useAltIntl()
  const [postalCode, setPostalCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const buscaCep = useCallback(() => {
    setLoading(true)
    setError('')
    const soNumeros = postalCode.replace('-', '').trim()

    fetch(`https://viacep.com.br/ws/${soNumeros}/json/`)
      .then((response) => response.json())
      .then(({ bairro, logradouro, uf, localidade }: ViaCepResponse) => {
        onAddress({
          street: logradouro,
          district: bairro,
          city: localidade,
          state: uf,
        })
      })
      .catch(() => {
        setError('Não foi possível recuperar seu endereço')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [postalCode, onAddress])

  const getCoordinates = useCallback(() => {
    if (!navigator.geolocation) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { H } = window as any
    const platform = new H.service.Platform({
      app_id: process.env.REACT_APP_HERE_APP_ID,
      apikey: process.env.REACT_APP_HERE_KEY,
    })

    const geocoder = platform.getGeocodingService()

    setLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      geocoder.reverseGeocode(
        {
          mode: 'retrieveAddresses',
          maxresults: 1,
          prox: `${position.coords.latitude},${position.coords.longitude}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          setLoading(false)
          try {
            const address = data.Response.View[0].Result[0].Location.Address

            const { Street, District, HouseNumber, City, State } = address

            onAddress({
              street: Street,
              district: District,
              number: HouseNumber,
              city: City,
              state: State,
            })
          } catch (e) {
            setError('Não foi possível buscar sua localização')
          }
        },
        (err: unknown) => {
          log(err)
          setLoading(false)
        }
      )
    })
  }, [onAddress])

  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="flex w-100 justify-center">
          <CepInput
            onChange={eSet(setPostalCode)}
            value={postalCode}
            disabled={loading}
            size="large"
            placeholder={intl.formatMessage({ id: 'address.postalCode' })}
            className="mr2"
          />
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={buscaCep}
          >
            {intl.formatMessage({
              id: loading ? 'address.loading' : 'address.search',
            })}
          </Button>
        </div>
      </div>
      {error && (
        <div className="tc mt2">
          <Typography.Text type="danger" className="tc mt2">
            {error}
          </Typography.Text>
        </div>
      )}
      <div className="tc mt2">
        <span className="tc">
          Ou
          <button
            className="bg-white bn underline pointer"
            onClick={() => !loading && getCoordinates()}
          >
            <Message id="address.useLocation" />
          </button>
        </span>
      </div>
    </Fragment>
  )
}

export default AutoFill
