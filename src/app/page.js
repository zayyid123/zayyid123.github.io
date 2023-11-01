import Image from 'next/image'
import { CalendarDaysIcon, BriefcaseIcon } from '@heroicons/react/24/solid'

// image
import IconOval from '../assets/icon/oval.png'
import IconPanahBawah from '../assets/icon/panah_bawah.png'
import IconPanahAtas from '../assets/icon/panah_atas.png'
import IconStar from '../assets/icon/star.png'
import IconPena from '../assets/icon/pena.png'
import FotoCV from '../assets/image/foto_cv.png'
import ImageAbout from '../assets/image/pic_about.png'
import CountNumber from './components/CountNumber'
import ButtonDownloadCV from './components/ButtonDownloadCV'

export default function Home() {
  return (
    <main className="pt-[80px]">
      {/* home */}
      <div 
        className='bg-bg-100 w-full'
      >
        {/* inner container */}
        <div
          className='flex items-center lg:items-start justify-center lg:justify-between flex-col-reverse lg:flex-row max-w-6xl m-auto text-white py-28 px-5'
        >
          {/* kiri */}
          <div
            className='min-w-[300px] flex flex-col justify-center items-center lg:items-start'
          >
            {/* name */}
            <div className='text-lg text-def-orange-300 mb-5 text-center lg:text-left'>Mochamad Muzayyid Al Hakim, S.Kom.</div>

            {/* kata kata */}
            <div className='font-bold text-7xl max-w-xl mb-3 text-center lg:text-left'>The Simple, Clean Code</div>

            {/* sub */}
            <div className='text-[#ffffffa8] max-w-sm text-sm mb-6 text-center lg:text-left'>Highly skilled and motivated Front-End Developer with a strong proficiency in React.js.</div>

            {/* button work */}
            <div
              className='group bg-def-orange-300 hover:bg-gray-600 flex justify-center items-center w-fit px-5 py-3 rounded-md cursor-pointer ease-in-out duration-300'
            >
              <p className='font-bold'>SEE MY WORK</p>
            </div>
          </div>

          {/* kanan */}
          <div
            className='relative min-w-[200px] mb-16'
          >
            {/* hiasan */}
            <div
              className='bg-white z-[25] absolute flex justify-between w-[150px] h-[100px] py-2 px-3 rounded-md left-0 top-[190px]'
            >
              <div className='bg-def-orange-300 w-8 h-8 rounded-full'></div>
              <div className='w-[60%] flex flex-col justify-evenly'>
                <div className='w-full h-2 bg-[#dfe0e9]'></div>
                <div
                  className='flex justify-between items-end'
                >
                  {
                    [8,6,8,2,6].map((res, index) => {
                      return(
                        <div key={'dekorasi'+index}>
                          <div className={`w-2 h-${res} bg-[#dfe0e9]`}></div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            {/* foto */}
            <div className='absolute right-[50%]'> 
              <Image src={FotoCV} alt='foto cv' className='relative z-[16] w-[270px] md:w-[260px] lg:w-[270px] top-[-120px] md:top-[-60px] lg:top-[-50px] -right-[50%] lg:-right-[70%] rounded-lg'/>
              <div className='w-[270px] md:w-[260px] lg:w-[270px] h-[330px] relative bg-def-yellow-300 z-[15] -right-[50%] lg:-right-[70%] top-[-510px] md:top-[-450px] lg:top-[-470px] rounded-t-full'></div>
            </div>

            {/* pena */}
            <Image src={IconPena} alt='icon pena' className='absolute z-[13] top-[10px] left-[-5px] w-[40px]'/>

            {/* star */}
            <Image src={IconStar} alt='icon star' className='absolute top-[-40px] left-[-50px] w-[140px] z-10' />

            {/* panah atas */}
            <Image src={IconPanahAtas} alt='icon panah atas' className='absolute top-12 left-6'/>

            {/* panah bawah */}
            <Image src={IconPanahBawah} alt='icon panah bawah' className='absolute bottom-[20px] left-[90px]'/>

            {/* oval */}
            <Image src={IconOval} alt='icon oval'/>
          </div>
        </div>
      </div>

      {/* about */}
      <div
        className='bg-bg-200 w-full'
      >
        {/* inner container about */}
        <div
          className='flex items-center gap-11 flex-col lg:flex-row max-w-6xl m-auto py-28 px-5'
        >
          <div
            className='w-[100%] flex justify-center items-center mb-7 lg:mb-0 relative'
          >
            {/* image cv */}
            <div
              className='absolute w-[140px] h-[140px] bg-def-purple-300 p-5 rounded-full overflow-hidden top-0 left-30 md:left-72 lg:left-28'
            >
              <Image src={FotoCV} alt='foto cv about'/>
            </div>

            {/* image variasi */}
            <Image src={ImageAbout} alt='image about' className='w-[300px]'/>
          </div>
          <div
            className='w-[100%] flex items-center flex-col lg:block'
          >
            <div
              className='flex items-start flex-col'
            >
              {/* name */}
              <div className='text-[#ef6d58] mb-4 text-lg text-left'>Mochamad Muzayyid Al Hakim, S.Kom.</div>

              {/* title */}
              <div className='text-[#391400] font-bold text-4xl lg:text-5xl mb-2 max-w-lg'>Professional Frontend Developer</div>

              {/* caption */}
              <div className='text-[#391400] mb-5 text-lg font-semibold'>Work with passion</div>

              {/* description */}
              <div className='text-[#7f6454] max-w-lg'>Equipped with a passion for crafting visually appealing and intuitive user interfaces, I am dedicated to delivering exceptional user experiences.</div>

              <ButtonDownloadCV/>
            </div>
          </div>
        </div>

        {/* inner calculate project */}
        <div
          className='flex justify-center items-center m-auto flex-wrap max-w-6xl pb-10 px-5'
        >
          <div
            className='px-8 py-4 border-t md:border-y border-x md:border-l md:border-r-0 border-def-orange-300 w-[100%] md:w-[50%]'
          >
            <div
              className='flex justify-start items-center'
            >
              <div
                className='bg-def-orange-300 w-fit p-2 rounded-full mr-4'
              >
                <CalendarDaysIcon className='w-10 h-10 text-white'/>
              </div>
              <CountNumber start={-875.039} end={4} duration={1.5} title={'Experience as a Programmer'}/>
            </div>
          </div>
          <div
            className='px-8 py-4 border border-def-orange-300 w-[100%] md:w-[50%]'
          >
            <div
              className='flex justify-start items-center'
            >
              <div
                className='bg-def-orange-300 w-fit p-2 rounded-full mr-4'
              >
                <BriefcaseIcon className='w-10 h-10 text-white'/>
              </div>
              <CountNumber start={-875.039} end={50} duration={1.5} title={'Projects Done'}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
