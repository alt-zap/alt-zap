import React, { Fragment, useState, useCallback } from "react"
import { Button, Typography } from "antd"
import MaskedInput from "./MaskedInput"
import { eSet } from "../util/utils"

export default ({ onAddress }) => {
  const [cep, setCep] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const buscaCep = useCallback(() => {
    setLoading(true)
    setError(null)
    const soNumeros = cep.replace("-", "").trim()
    fetch(`https://viacep.com.br/ws/${soNumeros}/json/`)
      .then(response => response.json())
      .then(data => {
        onAddress(data)
      })
      .catch(() => {
        setError("Não foi possível recuperar seu endereço")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [cep, onAddress])

  const pegaCoordenadas = useCallback(() => {
    if (navigator.geolocation) {
      const H = window.H
      const platform = new H.service.Platform({
        app_id: process.env.REACT_APP_HERE_APP_ID,
        apikey: process.env.REACT_APP_HERE_KEY
      })
      const geocoder = platform.getGeocodingService()
      setLoading(true)
      navigator.geolocation.getCurrentPosition(position => {
        geocoder.reverseGeocode(
          {
            mode: "retrieveAddresses",
            maxresults: 1,
            prox: position.coords.latitude + "," + position.coords.longitude
          },
          data => {
            setLoading(false)
            try {
              const address = data.Response.View[0].Result[0].Location.Address
              console.log(address)
              const {
                Street: logradouro,
                District: bairro,
                HouseNumber: numero
              } = address
              onAddress({ logradouro, bairro, numero })
            } catch (e) {
              setError("Não foi possível buscar sua localização")
            }
          },
          error => {
            console.error(error)
            setLoading(false)
          }
        )
      })
    }
  }, [onAddress])
  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="flex w-100 justify-center">
          <MaskedInput
            mask="00000-000"
            onChange={eSet(setCep)}
            value={cep}
            disabled={loading}
            size="large"
            placeholder={"CEP"}
            className="w-30 mr2"
          />
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={buscaCep}
          >
            {loading ? "Carregando..." : "Buscar"}
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
            href="#"
            onClick={() => !loading && pegaCoordenadas()}
            target="_blank"
          >
            use a sua localização
          </button>
        </span>
      </div>
    </Fragment>
  )
}
