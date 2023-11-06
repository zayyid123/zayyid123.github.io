'use client'
import React, { useState } from 'react'
import { Mochiy_Pop_P_One } from 'next/font/google'
import { useRouter } from 'next/navigation'

// font logo
const logo = Mochiy_Pop_P_One({
  weight: '400',
  subsets: ['latin'],
})

// icon
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = () => {
  const router = useRouter()
  const [isOPen, setisOPen] = useState(false)

  return (
    <div
      className='bg-bg-100 text-white sticky top-0 z-30 w-full'
    >
      <div
        className='bg-bg-100 px-16 py-3 min-h-[80px] absolute w-full z-20'
      >
        <div
          className='flex justify-between items-center max-w-7xl m-auto'
        >
          {/* logo */}
          <div
            className='font-bold text-def-orange-300 pr-16 text-xl cursor-pointer'
            onClick={() => {
              router.push('/#home')
            }}
          >
            <div className={logo.className}>ZAY<span className='text-white'>YID</span></div>
          </div>

          {/* menu desktop */}
          <div
            className='hidden lg:flex gap-20 font-light text-base text-[#ffffffa8]'
          >
            {/* about */}
            <div
              className='cursor-pointer hover:text-white ease-in-out duration-300'
              onClick={() => {
                router.push('/#about')
              }}
            >
              <p>About</p>
            </div>

            {/* Portfolio */}
            <div
              className='cursor-pointer hover:text-white ease-in-out duration-300'
              onClick={() => {
                router.push('/portfolio')
              }}
            >
              <p>Portfolio</p>
            </div>

            {/* Skills */}
            <div
              className='cursor-pointer hover:text-white ease-in-out duration-300'
              onClick={() => {
                router.push('/#skills')
              }}
            >
              <p>Skills</p>
            </div>

            {/* blog */}
            <div
              className='cursor-pointer hover:text-white ease-in-out duration-300'
              onClick={() => {
                router.push('/blog')
              }}
            >
              <p>Blog</p>
            </div>
          </div>

          {/* contact */}
          <div
            className='hidden lg:block font-bold text-sm py-3 px-8 border border-[#747474] rounded-md cursor-pointer hover:bg-def-orange-300 hover:text-bg-100 hover:border-bg-100 ease-in-out duration-300'
            onClick={() => {
              router.push('/#contact')
            }}
          >
            <p>CONTACT</p>
          </div>

          {/* hamburger button */}
          <div
            className='group block lg:hidden font-bold text-sm py-2 px-4 border border-[#747474] rounded-md cursor-pointer hover:bg-def-orange-300 hover:text-bg-100 hover:border-bg-100 ease-in-out duration-300'
            onClick={() => {
              setisOPen(!isOPen)
            }}
          >
            <Bars3Icon className='h-6 w-6 text-white group-hover:text-bg-100'/>
          </div>
        </div>
      </div>

      {/* menu mobile */}
      <div 
        className={`block lg:hidden absolute ${isOPen ? 'top-[80px]' : 'top-[-170px]'} ease-in-out duration-300 right-0 left-0 bg-def-orange-100 text-black`}
      >
        <div
          className='font-light items-center flex flex-col text-base text-bg-100 gap-5 py-5'
        >
          {/* about */}
          <div
            className='cursor-pointer hover:text-white ease-in-out duration-300'
            onClick={() => {
              router.push('/#about')
              setisOPen(false)
            }}
          >
            <p>About</p>
          </div>

          {/* Portfolio */}
          <div
            className='cursor-pointer hover:text-white ease-in-out duration-300'
            onClick={() => {
              router.push('/portfolio')
              setisOPen(false)
            }}
          >
            <p>Portfolio</p>
          </div>

          {/* Skills */}
          <div
            className='cursor-pointer hover:text-white ease-in-out duration-300'
            onClick={() => {
              router.push('/#skills')
              setisOPen(false)
            }}
          >
            <p>Skills</p>
          </div>

          {/* blog */}
          <div
            className='cursor-pointer hover:text-white ease-in-out duration-300'
            onClick={() => {
              router.push('/blog')
            }}
          >
            <p>Blog</p>
          </div>

          {/* Contact */}
          <div
            className='cursor-pointer text-white ease-in-out duration-300 bg-bg-100 px-3 py-1 rounded-md hover:bg-def-orange-300 hover:text-white'
            onClick={() => {
              router.push('/#contact')
              setisOPen(false)
            }}
          >
            <p>Contact</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar