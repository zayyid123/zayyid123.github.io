import React from 'react'

const Portfolio = () => {
  return (
    <div
      className="pt-[80px]"
    >
      <div
        className='bg-bg-100 w-full'
      >
        <div
          className='max-w-6xl m-auto py-28 px-5'
        >
          <div className='text-white font-bold text-center text-5xl mb-3'>Portfolio</div>

          <div className='text-[#b7b7b7] text-center'>Below are some of the projects, I have completed</div>
        </div>
      </div>

      {/* content */}
      <div
        className='bg-bg-200 w-full'
      >
        <div
          className='max-w-6xl m-auto py-10 px-5'
        >
          <div
            className='flex justify-center items-center gap-8 text-[#391400]'
          >
            <div className='cursor-pointer p-4 hover:text-def-orange-300 ease-in-out duration-300'>All</div>
            <div className='cursor-pointer p-4 hover:text-def-orange-300 ease-in-out duration-300'>Mobile</div>
            <div className='cursor-pointer p-4 hover:text-def-orange-300 ease-in-out duration-300'>Website</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio