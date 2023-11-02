import React from 'react'

const FormContact = () => {
  return (
    <form
      className='w-full'
    >
      <div
        className='mb-3'
      >
        <input type="email" id="email" className="bg-gray-50 border border-def-orange-300 text-gray-900 text-sm rounded-md block w-full p-2.5" placeholder="Your Email" required/>
      </div>
      <div>
        <textarea type="text" id="message" className="bg-gray-50 border border-def-orange-300 text-gray-900 text-sm rounded-md block w-full p-2.5 min-h-[200px]" placeholder="Message" required/>
      </div>

      {/* button submit */}
      <div
        className='flex justify-end'
      >
        <button
          type='submit'
          className='py-3 px-8 bg-def-orange-300 text-white drop-shadow-lg rounded-md font-bold mt-7 cursor-pointer hover:text-def-orange-300 hover:bg-bg-100 ease-in-out duration-300'
        >
          Submit Now
        </button>
      </div>
    </form>
  )
}

export default FormContact