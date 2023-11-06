'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

// config
import fbConfig from '@/app/config/firebase'
const db = getFirestore(fbConfig)

// third party
import parse from 'html-react-parser';

// css
import './blog.css'

const BlogViewer = ({ id, isAdmin = true }) => {
  const [detailBlog, setdetailBlog] = useState({})

  useEffect(() => {
    const getDetailBlog = async () => {
      const docRef = doc(db, "blog", id);
      const docSnap = await getDoc(docRef);

      setdetailBlog(docSnap.data())
    }

    getDetailBlog()
  }, [])

  return (
    <>
      <div className={`${isAdmin && 'max-w-3xl bg-gray-100 rounded-lg'} m-auto p-4`}>
        {/* title */}
        <div>
          {
            detailBlog &&
            <div className={`${!isAdmin && 'text-center'} capitalize text-3xl font-bold`}>
              {detailBlog.title}
            </div>
          }
        </div>

        {/* sub title */}
        <div>
          {
            detailBlog &&
            <div className={`${!isAdmin && 'text-center'} capitalize font-semibold`}>
              {detailBlog.sub_title}
            </div>
          }
        </div>

        {/* author */}
        <div>
          <div className={`${!isAdmin && 'text-center'} text-xs font-light`}>By: Mochamad Muzayyid Al Hakim</div>
        </div>

        {/* category */}
        <div className={`${!isAdmin && 'flex justify-center'} mb-5`}>
          {
            detailBlog &&
            <div className='font-light text-xs bg-def-300 w-fit text-def-100 px-1 rounded-sm'>
              {detailBlog.category}
            </div>
          }
        </div>

        {/* image */}
        <div className='mb-4 flex justify-center'>
          {
            detailBlog.image &&
            <div>
              <Image width={300} height={400} src={detailBlog.image} alt={detailBlog.title}/>
            </div>
          }
        </div>

        {/* date */}
        <div className='mb-1'>
          {
            detailBlog &&
            <div className='font-light from-neutral-500'>
              Updated {detailBlog.date}
            </div>
          }
        </div>

        {/* isi */}
        <div>
          {
            detailBlog &&
            <article className="prose max-w-none">
              {
                parse(`${detailBlog.content}`) === 'undefined' ? 
                'loading'
                :
                parse(`${detailBlog.content}`)
              }
            </article>
          }
        </div>
      </div>
    </>
  )
}

export default BlogViewer