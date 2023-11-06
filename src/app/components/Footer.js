import React from 'react'

// icon
import IconFacebook from '../../assets/icon/sosmed/facebook.svg'
import IconInstagram from '../../assets/icon/sosmed/instagram.svg'
import IconLinkedin from '../../assets/icon/sosmed/linkedin.svg'
import IconGithub from '../../assets/icon/sosmed/github.svg'
import Image from 'next/image'

const Footer = () => {
  const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return year
  }

  return (
    <div
      className='bg-bg-100 w-full'
    >
      <div
        className='max-w-6xl m-auto pt-28 pb-8 px-5'
      >
        <div
          className='flex justify-center md:justify-between items-center md:items-start mb-16 flex-col md:flex-row gap-8'
        >
          <div className='font-bold text-lg text-white'>Personal Website</div>

          <div className='text-white flex flex-col gap-2 md:text-left text-center'>
            <div className='text-def-orange-300 mb-4'>Menu</div>
            <div>About</div>
            <div>Portfolio</div>
            <div>Skills</div>
            <div>Blog</div>
          </div>

          <div className='text-white flex flex-col gap-2 md:text-left text-center'>
            <div className='text-def-orange-300 mb-4'>Skills</div>
            <div
              className='flex gap-5'
            >
              <div
                className='flex flex-col gap-2'
              >
                <div>HTML</div>
                <div>CSS</div>
                <div>Javascript</div>
                <div>React.js</div>
              </div>
              <div
                className='flex flex-col gap-2'
              >
                <div>React Native</div>
                <div>Tailwind</div>
                <div>Bootstrap</div>
                <div>Next.js</div>
              </div>
            </div>
          </div>

          <div
            className='flex justify-between items-center'
          >
            {/* fb */}
            <a 
              href='https://www.facebook.com/mochamad.zayyid'
              target='_blank'
              className='bg-def-orange-300 mx-1 rounded-full cursor-pointer hover:bg-[#32334c] ease-in-out duration-300'
            >
              <Image src={IconFacebook} alt='fb' className='w-[33px]'/>
            </a>

            {/* ig */}
            <a
              href='https://www.instagram.com/zayyid_123/'
              target='_blank'
              className='bg-def-orange-300 mx-1 rounded-full cursor-pointer hover:bg-[#32334c] ease-in-out duration-300'
            >
              <Image src={IconInstagram} alt='ig' className='w-[33px]'/>
            </a>

            {/* linkedin */}
            <a
              href='https://www.linkedin.com/in/mochamad-zayyid/'
              target='_blank'
              className='bg-def-orange-300 mx-1 rounded-full p-[2px] cursor-pointer hover:bg-[#32334c] ease-in-out duration-300'
            >
              <Image src={IconLinkedin} alt='linkedin' className='w-[30px]'/>
            </a>

            {/* github */}
            <a
              href='https://github.com/zayyid123'
              target='_blank'
              className='mx-[2.5px] bg-def-orange-300 p-[5.5px] rounded-full cursor-pointer hover:bg-[#32334c] ease-in-out duration-300'
            >
              <Image src={IconGithub} alt='github' className='w-[25px]'/>
            </a>
          </div>
        </div>

        <hr/>

        <div>
          <div className='text-[#b7b7b7] text-center mt-4'>Copyright © {getYear()} Zayyid. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  )
}

export default Footer