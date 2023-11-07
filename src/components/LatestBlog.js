import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import removePunctuation from "../utils/removePunctuation";
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
          <Link
            to={`/blog/${removePunctuation(dataBlogLatest[0].title)
              .split(" ")
              .join("-")}/${dataBlogLatest[0].id}`}
          >
            <div className="group cursor-pointer">
              <div className="w-full rounded-md mb-6 overflow-hidden">
                <img
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
          </Link>
        </div>
      )}

      {/* array bawah */}
      {dataBlogLatest && (
        <div className="w-[100%] md:w-[25%]">
          {dataBlogLatest.map((res, index) => {
            return (
              index !== 0 && (
                <Link
                  key={"itemblog" + index}
                  to={`/blog/${removePunctuation(res.title)
                    .split(" ")
                    .join("-")}/${res.id}`}
                >
                  <div className="group mb-6 w-full cursor-pointer">
                    <div className="w-full rounded-md mb-6 overflow-hidden">
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
                    <div className="mb-6 font-bold text-4xl md:text-lg lg:max-w-sm">
                      {res.title}
                    </div>

                    {/* date */}
                    <div>{res.date}</div>
                  </div>
                </Link>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBlog;
