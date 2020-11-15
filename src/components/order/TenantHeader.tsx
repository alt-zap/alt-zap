import React, { FC, useMemo } from 'react'
import { styled } from 'linaria/react'

import { useTenantConfig } from '../../contexts/TenantContext'
import instagram from '../../assets/instagram.svg'
import whatsapp from '../../assets/whatsapp.svg'
import OpenStatus from '../common/OpenStatus'
import { useAltIntl } from '../../intlConfig'
import { isTenantOpen } from '../../utils'

const TenantHeader: FC = () => {
  const { tenant } = useTenantConfig()
  const { formatMessage } = useAltIntl()

  const backgroundColor = tenant?.color ?? '#001529'
  const isOpen = useMemo(
    () =>
      tenant?.openingHours ? isTenantOpen(tenant?.openingHours ?? {}) : false,
    [tenant]
  )

  return (
    <>
      <TopBar color={backgroundColor}>
        {tenant?.instagram ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://instagram.com/${tenant?.instagram}`}
            title="Ir para o Instagram"
          >
            <img src={instagram} alt="Ir para o Instagram" width="30" />
          </a>
        ) : (
          <div />
        )}
        <MakeYourOrder>
          {formatMessage({ id: 'order.makeYourOrder' })}
        </MakeYourOrder>
        <a
          href={`https://wa.me/${tenant?.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Ir para o WhatsApp"
        >
          <img
            src={whatsapp}
            alt="Ir para o WhatsApp"
            width="30"
            style={{ fill: 'white' }}
          />
        </a>
      </TopBar>
      <InfoContainer>
        <InfoGrid hasLogo={!!tenant?.logoSrc}>
          {!!tenant?.logoSrc && (
            <Logo
              src={tenant.logoSrc}
              title={tenant?.name}
              width={110}
              height={110}
            />
          )}
          <TenantData>
            <TenantName>{tenant?.name}</TenantName>
            <OpenStatus
              className="pointer dim"
              isOpen={isOpen}
              color={isOpen ? 'blue' : 'red'}
            >
              {formatMessage({
                id: isOpen ? 'tenant.open' : 'tenant.closed',
              })}
            </OpenStatus>
          </TenantData>
        </InfoGrid>
      </InfoContainer>
    </>
  )
}

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const MakeYourOrder = styled.span`
  font-weight: 200;
  color: white;
  font-size: 20px;
`

const TenantData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Logo = styled.img`
  border-radius: 20px;
  border: 4px solid white;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
`

const TenantName = styled.span`
  font-weight: bold;
  font-size: 20px;
`

const InfoGrid = styled.div<{ hasLogo: boolean }>`
  max-width: 500px;
  width: 100%;
  padding: 10px 15px;
  display: grid;
  column-gap: 10px;
  grid-template-columns: ${(props) => (props.hasLogo ? '1fr 2fr' : '1fr')};
`

const TopBar = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 10;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.color};
`

export default TenantHeader
