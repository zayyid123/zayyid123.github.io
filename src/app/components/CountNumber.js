'use client'
import React, { useEffect } from 'react'

// library
import CountUp from 'react-countup';

const CountNumber = ({start = 0, end = 0, duration =0, title =''}) => {
  return (
    <div>
      <div className='text-[#391400] font-bold text-2xl flex'>
        <CountUp
          start={start}
          end={end}
          duration={duration}
          useEasing={true}
          enableScrollSpy={true}
          scrollSpyDelay={2}
          useGrouping={true}
          separator=','
          decimal='.'
        /><span>+</span>
      </div>
      <div className='text-[#391400]'>{title}</div>
    </div>
  )
}

export default CountNumber