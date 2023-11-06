import React from 'react'
import BlogPageSection from '../components/BlogPageSection'

const BlogPage = () => {
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
          <div className='text-white font-bold text-center text-5xl mb-3'>Blog Articles</div>

          <div className='text-[#b7b7b7] text-center'>Several blogs that I created</div>
        </div>
      </div>

      {/* content */}
      <div
        className='bg-bg-200 w-full'
      >
        <div
          className='max-w-6xl m-auto py-10 px-5'
        >
          <BlogPageSection/>
        </div>
      </div>
    </div>
  )
}

export default BlogPage