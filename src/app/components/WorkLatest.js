'use client'
import React, { useEffect, useState } from 'react'
import CardWork from './CardWork'
import { collection, getDocs, getFirestore, limitToLast, orderBy, query } from "firebase/firestore";

// config
import fbConfig from '../config/firebase';
const db = getFirestore(fbConfig)

const WorkLatest = () => {
  const [dataWorkLatest, setdataWorkLatest] = useState()

  useEffect(() => {
    const getDataWork = async() => {
      const portoRef = collection(db, "portfolio")

      // ambil data
      const queryData = query(portoRef,orderBy('createdAt'), limitToLast(3))
      const querySnapshot = await getDocs(queryData);

      let data = []

      // tambah data dari database
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });

      setdataWorkLatest(data)
    }

    getDataWork()
  }, [])

  return (
    <div
      className='flex justify-center items-center flex-wrap gap-4'
    >
      {
        dataWorkLatest?.map((res, index) => {
          return(
            <div 
              key={'itemCardPorto'+index}
            >
              <CardWork data={res} index={index} isHeight={true} />
            </div>
          )
        })
      }
    </div>
  )
}

export default WorkLatest