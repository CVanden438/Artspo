import React, { useState } from 'react'

const Alert = ({ message, type }) => {
  let colour = ''
  if (type === 'success') {
    colour = 'bg-green-400'
  }
  if (type === 'error') {
    colour = 'bg-red-400'
  }
  return <div className={colour}>{message}</div>
}

export default Alert
