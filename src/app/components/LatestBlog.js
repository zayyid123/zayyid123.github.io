import Image from 'next/image'
import React from 'react'

const LatestBlog = ({ data }) => {
  return (
    <div
      className='flex justify-between items-start flex-wrap px-8 text-[#391400] gap-5'
    >
      {/* array 0 */}
      <div
        className='w-[100%] md:w-[70%]'
      >
        {/* card */}
        <div >
          <Image 
            src={data[0].image} 
            alt={data[0].title} 
            width={300} 
            height={300}
            className='w-full rounded-md mb-6 object-cover'
          />

          {/* category */}
          <div className='mb-6 font-semibold'>{data[0].category}</div>

          {/* title */}
          <div className='mb-6 font-bold text-4xl'>{data[0].title}</div>

          {/* date */}
          <div>{data[0].date}</div>
        </div>
      </div>

      {/* array bawah */}
      <div
        className='w-[100%] md:w-[25%]'
      >
        {
          data.map((res, index) => {
            return(
              index !== 0 &&
              <div 
                key={'itemblog' + index}
                className='mb-6 w-full'
              >
                <Image 
                  src={res.image} 
                  alt={res.title} 
                  width={100} 
                  height={100}
                  className='w-full rounded-md mb-6 object-cover'
                />

                {/* category */}
                <div className='mb-6 font-semibold'>{res.category}</div>

                {/* title */}
                <div className='mb-6 font-bold text-4xl md:text-lg lg:max-w-sm'>{res.title}</div>

                {/* date */}
                <div>{res.date}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default LatestBlog