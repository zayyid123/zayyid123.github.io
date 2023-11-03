'use client'
import React, { useEffect, useState } from 'react'
import CardWork from './CardWork'
import { collection, getDocs, getFirestore, limitToLast, orderBy, query } from "firebase/firestore";

// config
import fbConfig from '../config/firebase';
const db = getFirestore(fbConfig)

const PortfolioPageSection = () => {
  const [dataPortfolio, setdataPortfolio] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageButtons , setpageButtons ] = useState([1])
  const [filter, setfilter] = useState('all')
  const itemsPerPage = 3;
  let totalPages = 0

  const getTotalButtons = (dataTotalPages) => {
    // ambil jumlah button
    const buttons = [];
    for (let i = 1; i <= dataTotalPages; i++) {
      buttons.push(i);
    }
    setpageButtons(buttons)
  }

  const getTotalPages = (data) => {
    // ambil total page
    if (filter === 'all') {
      totalPages = Math.ceil(data?.length / itemsPerPage);
    } else {
      totalPages = Math.ceil(data?.filter((item) => item.project.toLowerCase() === filter.toLowerCase()).length / itemsPerPage);
    }

    // ambil total button yang diperlukan
    getTotalButtons(totalPages)
  }

  const getDataPortfolio = async() => {
    const portoRef = collection(db, "portfolio")

      // ambil data
      const queryData = query(portoRef,orderBy('createdAt'))
      const querySnapshot = await getDocs(queryData);

      let data = []

      // tambah data dari database
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });
      
      // ambil total page yang ada
      await getTotalPages(data)

      setdataPortfolio(data)
  }

  useEffect(() => {
    getDataPortfolio()
  }, [])
  
  useEffect(() => {
    getTotalPages(dataPortfolio)
  }, [filter])

  return (
    <div>
      {/* button header */}
      <div
        className='flex justify-center items-center gap-5 text-[#391400] flex-wrap'
      >
        <div 
          className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${filter == 'all' && 'text-def-orange-300'}`}
          onClick={() => {
            setfilter('all')
          }}
        >
          All
        </div>
        <div 
          className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${filter == 'mobile' && 'text-def-orange-300'}`}
          onClick={() => {
            setfilter('mobile')
          }}
        >
          Mobile
        </div>
        <div 
          className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${filter == 'website' && 'text-def-orange-300'}`}
          onClick={() => {
            setfilter('website')
          }}
        >
          Website
        </div>
      </div>

      {/* card */}
      <div
        className='flex justify-center items-center mt-6 flex-wrap gap-5'
      >
        {
          dataPortfolio
          ?.filter((data) => filter === 'all' ? data : data.project.toLowerCase() === filter.toLowerCase())
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((res, index) => {
            return(
              <div 
                key={'itemCardPorto'+index}
              >
                <CardWork data={res} index={index} isHeight={false}/>
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
          pageButtons?.map((res, index) => {
            return(
              <div 
                key={'itemHalaman'+index}
                className={`px-3 py-1 ${res === currentPage ? 'bg-def-orange-300 text-white' : 'bg-white text-bg-100'} rounded-md cursor-pointer hover:bg-def-orange-100 ease-in-out duration-300`}
                onClick={() => setCurrentPage(res)}
              >
                <div>{res}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PortfolioPageSection