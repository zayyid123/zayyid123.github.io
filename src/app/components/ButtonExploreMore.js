'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonExploreMore = () => {
  const router = useRouter()
  return (
    <div
      className='font-bold text-sm text-white py-3 px-8 border border-[#747474] rounded-md cursor-pointer hover:bg-def-orange-300 hover:text-bg-100 hover:border-bg-100 ease-in-out duration-300'
      onClick={() => {
        router.push('/portfolio')
      }}
    >
      EXPLORE MORE
    </div>
  )
}

export default ButtonExploreMore