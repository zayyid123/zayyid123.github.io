import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";
import removePunctuation from "../utils/removePunctuation";

// config
import fbConfig from "../config/firebase";
const db = getFirestore(fbConfig);

const RelatedBlog = () => {
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

      <div className="flex justify-between items-start gap-4 flex-wrap md:flex-nowrap">
        {dataBlog &&
          dataBlog.map((res, index) => {
            return (
              <a
                key={"itemblog" + index}
                href={`/blog/${removePunctuation(res.title)
                  .split(" ")
                  .join("-")}/${res.id}`}
                className="group mb-6 w-full cursor-pointer"
              >
                <div className="w-full rounded-md mb-6 overflow-hidden md:max-h-[160px]">
                  <img
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
                <div className="mb-6 font-bold text-4xl md:text-lg md:max-h-14 md:overflow-hidden text-ellipsis">
                  {res.title}
                </div>

                {/* date */}
                <div>{res.date}</div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default RelatedBlog;
