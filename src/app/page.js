import Image from 'next/image'

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

// skills
import IconHtml from '../assets/icon/skills/html.png'
import IconCss from '../assets/icon/skills/css.png'
import IconJs from '../assets/icon/skills/javascript.png'
import IconReact from '../assets/icon/skills/react.png'
import IconNextjs from '../assets/icon/skills/nextjs.png'
import IconTailwind from '../assets/icon/skills/tailwind.png'
import IconBootstrap from '../assets/icon/skills/bootstrap.png'
import LatestBlog from './components/LatestBlog'
import FormContact from './components/FormContact'

// icon
import { CalendarDaysIcon, BriefcaseIcon, MapPinIcon, PhoneIcon, EnvelopeIcon  } from '@heroicons/react/24/solid'
import ButtonExploreMore from './components/ButtonExploreMore'

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

// data blog latest
const dataBlogLatest = [
  {
    image: 'https://placehold.co/600x400.png',
    title: 'Agency is a business you hire to outsource',
    category: 'Stories',
    date: '5 Nov, 2021'
  },
  {
    image: 'https://placehold.co/600x400.png',
    title: 'Outsource your digital marketing efforts',
    category: 'Design',
    date: '29 Oct, 2021'
  },
  {
    image: 'https://placehold.co/600x400.png',
    title: 'Your business with a variety of digital',
    category: 'Marketing',
    date: '21 Oct, 2021'
  },
]

export default function Home() {
  return (
    <main className="pt-[80px]">
      {/* home */}
      <div 
        id='home'
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
        id='about'
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

      {/* portfolio */}
      <div
        id='portfolio'
        className='bg-bg-100 w-full'
      >
        {/* inner */}
        <div
          className='max-w-6xl m-auto py-28 px-5'
        >
          {/* header */}
          <div
            className='flex justify-between items-start lg:items-end flex-col lg:flex-row gap-7 w-full px-10 mb-16'
          >
            <div>
              <div
                className='text-def-orange-300 text-lg'
              >
                PORTFOLIO
              </div>
              <div
                className='text-white text-4xl font-bold'
              >
                Latest Work
              </div>
            </div>

            <ButtonExploreMore/>
          </div>

          {/* work */}
          <div
            className='flex justify-center items-center flex-wrap gap-4'
          >
            {
              dataWorkLatest.map((res, index) => {
                return(
                  <div 
                    key={'itemCardPorto'+index}
                    className='group bg-def-orange-100 max-w-[330px] h-[500px] rounded-md relative overflow-hidden cursor-pointer'
                  >
                    <Image 
                      src={res.image} 
                      alt={`item porto ${index}`}
                      width={300}
                      height={600}
                      className='object-cover w-full h-full rounded-md transform group-hover:scale-110 ease-in-out duration-300'
                    />
                    <div
                      className='absolute bottom-5 left-5 z-10'
                    >
                      <div className='bg-white group-hover:bg-def-orange-300 group-hover:text-white ease-in-out duration-300 drop-shadow-lg text-center rounded-full text-bg-100 py-1 px-4 mb-1 w-fit'>
                        <div>{res.project}</div>
                      </div>
                      <div className='text-white group-hover:text-def-orange-300 ease-in-out duration-300 drop-shadow-md font-bold text-xl px-1'>{res.name}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* skills */}
      <div
        id='skills'
        className='bg-bg-200 w-full'
      >
        {/* inner */}
        <div
          className='max-w-6xl m-auto py-28 px-5'
        >
          {/* title */}
          <div className='w-full text-center text-def-orange-300 mb-8 text-lg'>SKILLS</div>

          {/* caption */}
          <div className='w-full text-[#391400] font-bold text-center text-4xl md:text-5xl max-w-md m-auto'>Several mastered technologies</div>

          {/* skills */}
          <div
            className='flex justify-center items-center flex-wrap mt-16'
          >
            {/* html */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconHtml} alt='icon html' className='drop-shadow-lg m-3'/>
            </div>

            {/* css */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconCss} alt='icon css' className='drop-shadow-lg m-3'/>
            </div>

            {/* js */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconJs} alt='icon js' className='drop-shadow-lg m-3'/>
            </div>

            {/* react */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconReact} alt='icon react' className='drop-shadow-lg m-3'/>
            </div>

            {/* next */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconNextjs} alt='icon next' className='drop-shadow-lg m-3'/>
            </div>

            {/* tailwind */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconTailwind} alt='icon tailwind' className='drop-shadow-lg m-3'/>
            </div>

            {/* bootstrap */}
            <div
              className='group p-8 w-[250px] transform hover:scale-110 ease-in-out duration-300'
            >
              <Image src={IconBootstrap} alt='icon bootstrap' className='drop-shadow-lg m-3'/>
            </div>
          </div>
        </div>
      </div>

      {/* latest blog */}
      <div
        id='latest_blog'
        className='bg-[#f9e5da] w-full'
      >
        {/* inner */}
        <div
          className='max-w-6xl m-auto py-28 px-5'
        >
          {/* header */}
          <div
            className='flex justify-between items-start lg:items-end flex-col lg:flex-row gap-7 w-full px-10 mb-16'
          >
            <div>
              <div
                className='text-def-orange-300 text-lg'
              >
                OUR BLOG
              </div>
              <div
                className='text-[#391400] text-4xl font-bold'
              >
                Latest Blog Articles
              </div>
            </div>

            <div
              className='font-bold text-sm text-bg-100 bg-white py-3 px-8 border border-white rounded-md drop-shadow-lg cursor-pointer hover:bg-bg-100 hover:text-def-orange-300 hover:border-bg-100 ease-in-out duration-300'
            >
              DISCOVER ALL
            </div>
          </div>

          {/* blog */}
          <div>
            <LatestBlog data={dataBlogLatest}/>
          </div>
        </div>
      </div>

      {/* contact */}
      <div
        id='contact'
        className='bg-bg-100 w-full'
      >
        <div
          className='max-w-6xl m-auto py-28 px-5'
        >
          <div
            className='flex justify-between items-start gap-8 lg:gap-36 flex-col-reverse lg:flex-row'
          >
            <div
              className='w-[100%] lg:w-[50%]'
            >
              <div
                className='bg-white p-4 rounded-md w-full'
              >
                <div className='text-[#391400] font-bold text-3xl mb-5'>Get In Touch</div>

                <FormContact/>
              </div>
            </div>
            <div
              className='w-[100%] lg:w-[50%]'
            >
              <div className='text-def-orange-300 text-lg mb-5'>CONTACT</div>

              <div className='text-white text-4xl font-bold mb-2'>Contact Me</div>

              <div className='text-[#b7b7b7] text-sm mb-7'>You can contact me below</div>

              {/* alamat */}
              <div
                className='flex gap-2 items-center mb-6'
              >
                {/* icon */}
                <div
                  className='bg-def-orange-300 w-fit p-2 rounded-full'
                >
                  <MapPinIcon className='w-[30px]' fill='#fff'/>
                </div>

                <div className='text-white font-light text-base'>Jawa Timur, Pasuruan, Kec. Beji, RT. 11, RW. 05 </div>
              </div>

              {/* phone */}
              <div
                className='flex gap-2 items-center mb-6'
              >
                {/* icon */}
                <div
                  className='bg-def-orange-300 w-fit p-2 rounded-full'
                >
                  <PhoneIcon className='w-[30px]' fill='#fff'/>
                </div>

                <div className='text-white font-light text-base'>+62 8573-1003-893</div>
              </div>

              {/* phone */}
              <div
                className='flex gap-2 items-center mb-6'
              >
                {/* icon */}
                <div
                  className='bg-def-orange-300 w-fit p-2 rounded-full'
                >
                  <EnvelopeIcon className='w-[30px]' fill='#fff'/>
                </div>

                <div className='text-white font-light text-base'>mochamadzayyid@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hiasan */}
      <div
        className='bg-bg-200 w-full'
      >
        <div
          className='max-w-6xl m-auto py-28'
        >
          <div className='w-full text-center text-def-orange-300 mb-8 text-lg'>MAPS</div>

          {/* caption */}
          <div className='w-full text-[#391400] font-bold text-center text-4xl md:text-5xl max-w-md m-auto'>Find Me</div>

          <div 
            className='bg-white rounded-md p-3 mt-8 mx-3'
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15818.967327491184!2d112.75066323332076!3d-7.603049428589278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7db9dc6a5aca3%3A0xae4a49ccd9c92f78!2sGajahbendo%2C%20Kec.%20Beji%2C%20Pasuruan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1698918482980!5m2!1sid!2sid" 
              width="100%" 
              height="450" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
