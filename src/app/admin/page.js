'use client'
import React from 'react'
import { UserAuth } from '../context/AuthContext'

const PageAdmin = () => {
  const { user } = UserAuth()

  return (
    <div>admin</div>
  )
}

export default PageAdmin