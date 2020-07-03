import React from 'react'

export default ({ src, title }) => {
  return (
    <div className="bg-red">
      <img src={src} alt={title} title={title} />
    </div>
  )
}
