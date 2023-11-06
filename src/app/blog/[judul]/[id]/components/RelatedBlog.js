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
import fbConfig from "@/app/config/firebase";
import Image from "next/image";
import removePunctuation from "@/app/utils/removePunctuation";
const db = getFirestore(fbConfig);

const RelatedBlog = () => {
  const router = useRouter()
  const [dataBlog, setdataBlog] = useState();

  const getDataBlog = async () => {
    const blogRef = collection(db, "blog");

    // ambil data
    const queryData = query(blogRef, orderBy("date"), limitToLast(3));
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
  }, []);

  return (
    <div>
      {/* title */}
      <div className="font-bold text-3xl my-5">Related Articles</div>

      <div className="flex justify-between items-start gap-4">
        {dataBlog &&
          dataBlog.map((res, index) => {
            return (
              <div
                key={"itemblog" + index}
                className="group mb-6 w-full cursor-pointer"
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
                <div className="mb-6 font-bold text-4xl md:text-lg max-h-14 overflow-hidden text-ellipsis">

                  {res.title}
                </div>

                {/* date */}
                <div>{res.date}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RelatedBlog;
