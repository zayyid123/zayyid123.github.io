import React from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

// config
import fbConfig from '@/app/config/firebase'
import MainDetailBlog from './components/MainDetailBlog'
const dbBlog = getFirestore(fbConfig)

// set dynamic metadata
export async function generateMetadata({ params }) {
  // read route params
  const judul = params.judul.split('-').join(' ')
  const idBlog = params.id

  const getDetailBlog = async () => {
    const docRef = doc(dbBlog, "blog", idBlog);
    const docSnap = await getDoc(docRef);

    return docSnap.data()
  }

  const dataBlog = await getDetailBlog()
  
  return {
    title: `Mochamad Muzayyid Al Hakim | Frontend Developer - ${judul}`,
    description: judul,
    openGraph: {
      images: [dataBlog.image.split('upload/').join('upload/w_300,f_auto/')],
    },
  };
}

const DetailBlog = ({ params }) => {
  const { id } = params
  return (
    <div>
      <MainDetailBlog id={id}/>
    </div>
  )
}

export default DetailBlog