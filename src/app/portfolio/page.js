import React from 'react'
import CardWork from '../components/CardWork'

// data work latest
const dataWorkLatest = [
  {
    name: 'WhatsApp Clone',
    image: 'https://raw.githubusercontent.com/zayyid123/WhatsApp_Clone-mobile/main/whastapp-clone-1x1.png',
    project: 'Mobile',
  },
  {
    name: 'Al-Kalam',
    image: 'https://raw.githubusercontent.com/zayyid123/al-kalam-mobile/main/al%20kalam%20mobile.png',
    project: 'Mobile',
  },
  {
    name: 'Simple Calculator',
    image: 'https://raw.githubusercontent.com/zayyid123/simple-calculator-mobile/main/simple-calculator-1x1.png',
    project: 'Mobile',
  },
]

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
          {/* button header */}
          <div
            className='flex justify-center items-center gap-5 text-[#391400] flex-wrap'
          >
            <div className='cursor-pointer p-4 hover:text-def-orange-300 ease-in-out duration-300'>All</div>
            <div className='cursor-pointer p-4 hover:text-def-orange-300 ease-in-out duration-300'>Mobile</div>
            <div className='cursor-pointer p-4 hover:text-def-orange-300 ease-in-out duration-300'>Website</div>
          </div>

          {/* card */}
          <div
            className='flex justify-between items-center mt-6 flex-wrap gap-5'
          >
            {
              dataWorkLatest.map((res, index) => {
                return(
                  <div 
                    key={'itemCardPorto'+index}
                  >
                    <CardWork data={res} index={index} height={300}/>
                  </div>
                )
              })
            }
          </div>

          {/* halaman */}
          <div
            className='flex justify-center items-center mt-9 gap-3 flex-wrap'
          >
            {
              [1,2,3,4 ,5,6,7,8,9].map((res, index) => {
                return(
                  <div 
                    key={'itemHalaman'+index}
                    className={`px-3 py-1 ${index === 0 ? 'bg-def-orange-300 text-white' : 'bg-white text-bg-100'} rounded-md cursor-pointer hover:bg-def-orange-100 ease-in-out duration-300`}
                  >
                    <div>{res}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio