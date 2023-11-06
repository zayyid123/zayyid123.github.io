"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";

// config
import fbConfig from "../config/firebase";
const db = getFirestore(fbConfig);

const LatestBlog = () => {
  const [dataBlogLatest, setdataBlogLatest] = useState();

  useEffect(() => {
    const getDataBlog = async () => {
      const portoRef = collection(db, "blog");

      // ambil data
      const queryData = query(portoRef, orderBy("date"), limitToLast(3));
      const querySnapshot = await getDocs(queryData);

      let data = [];

      // tambah data dari database
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setdataBlogLatest(data);
    };

    getDataBlog();
  }, []);

  return (
    <div className="flex justify-between items-start flex-wrap px-8 text-[#391400] gap-5">
      {/* array 0 */}
      {dataBlogLatest && (
        <div className="w-[100%] md:w-[70%]">
          {/* card */}
          <div
            className="group cursor-pointer"
          >
            <div
              className="w-full rounded-md mb-6 overflow-hidden"
            >
              <Image
                src={dataBlogLatest[0].image}
                alt={dataBlogLatest[0].title}
                width={300}
                height={300}
                className="w-full rounded-md object-cover group-hover:scale-105 ease-in-out duration-300"
              />
            </div>

            {/* category */}
            <div className="mb-6 font-semibold">
              {dataBlogLatest[0].category}
            </div>

            {/* title */}
            <div className="mb-6 font-bold text-4xl">
              {dataBlogLatest[0].title}
            </div>

            {/* date */}
            <div>{dataBlogLatest[0].date}</div>
          </div>
        </div>
      )}

      {/* array bawah */}
      {dataBlogLatest && (
        <div className="w-[100%] md:w-[25%]">
          {dataBlogLatest.map((res, index) => {
            return (
              index !== 0 && (
                <div key={"itemblog" + index} className="group mb-6 w-full cursor-pointer">
                  <div
                    className="w-full rounded-md mb-6 overflow-hidden"
                  >
                    <Image
                      src={res.image}
                      alt={res.title}
                      width={100}
                      height={100}
                      className="w-full rounded-md object-cover group-hover:scale-105 ease-in-out duration-300"
                    />
                  </div>

                  {/* category */}
                  <div className="mb-6 font-semibold">{res.category}</div>

                  {/* title */}
                  <div className="mb-6 font-bold text-4xl md:text-lg lg:max-w-sm">
                    {res.title}
                  </div>

                  {/* date */}
                  <div>{res.date}</div>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBlog;
