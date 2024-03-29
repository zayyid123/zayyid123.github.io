"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import removePunctuation from "../utils/removePunctuation";
const db = getFirestore(fbConfig);

const BlogPageSection = () => {
  const router = useRouter()
  const [dataBlog, setdataBlog] = useState();
  const [filter, setfilter] = useState("all");
  const [showData, setshowData] = useState(6);

  const getDataBlog = async () => {
    const blogRef = collection(db, "blog");

    // ambil data
    const queryData = query(blogRef, orderBy("date"), limitToLast(showData));
    const querySnapshot = await getDocs(queryData);

    let data = [];

    // tambah data dari database
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setdataBlog(data);
  };

  useEffect(() => {
    getDataBlog();
  }, [showData]);

  return (
    <div>
      {/* button header */}
      <div className="flex justify-center items-center gap-5 text-[#391400] flex-wrap mb-8">
        <div
          className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${
            filter == "all" && "text-def-orange-300"
          }`}
          onClick={() => {
            setfilter("all");
          }}
        >
          All
        </div>
        <div
          className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${
            filter == "it" && "text-def-orange-300"
          }`}
          onClick={() => {
            setfilter("it");
          }}
        >
          IT
        </div>
        <div
          className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${
            filter == "design" && "text-def-orange-300"
          }`}
          onClick={() => {
            setfilter("design");
          }}
        >
          Design
        </div>
      </div>

      <div className="flex justify-center xl:justify-between items-center md:items-start flex-col md:flex-row gap-6 flex-wrap text-[#391400]">
        {dataBlog &&
          dataBlog
          .filter((data) => filter === 'all' ? data : data.category.toLowerCase() === filter.toLowerCase())
          .map((res, index) => {
            return (
              <div
                key={"itemblog" + index}
                className="group mb-6 w-full max-w-[350px] cursor-pointer"
                onClick={() => {
                  router.push(
                    `/blog/${removePunctuation(res.title)
                      .split(" ")
                      .join("-")}/${res.id}/#blog_detail`
                  );
                }}
              >
                <div className="w-full rounded-md mb-6 overflow-hidden">
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
                <div className="mb-6 font-bold text-4xl md:text-lg">
                  {res.title}
                </div>

                {/* date */}
                <div>{res.date}</div>
              </div>
            );
          })}
      </div>

      <div
        className="flex justify-center"
      >
        <button
          className="py-3 px-8 bg-white drop-shadow-lg rounded-md font-bold mt-7 cursor-pointer hover:text-def-orange-300 hover:bg-bg-100 ease-in-out duration-300"
          onClick={() => {
            setshowData(showData + 6);
          }}
        >
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default BlogPageSection;
