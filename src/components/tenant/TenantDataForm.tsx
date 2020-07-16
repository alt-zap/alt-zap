import React, { FC } from 'react'

const TenantDataForm: FC = () => (
  <div className="flex flex-column">
    <div>
      <label htmlFor="name">Nome do seu negócio</label>
      <input type="text" id="name" />
    </div>
  </div>
)

export default TenantDataForm
