'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonSeeMyWork = () => {
  const router = useRouter()
  return (
    <div
      className='group bg-def-orange-300 hover:bg-gray-600 flex justify-center items-center w-fit px-5 py-3 rounded-md cursor-pointer ease-in-out duration-300'
      onClick={() => {
        router.push('/portfolio')
      }}
    >
      <p className='font-bold'>SEE MY WORK</p>
    </div>
  )
}

export default ButtonSeeMyWork