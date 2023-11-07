/* eslint-disable react-hooks/exhaustive-deps */
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
import fbConfig from "../../config/firebase";
import removePunctuation from "../../utils/removePunctuation";
import { Link } from "react-router-dom";
import CardWork from "../../components/CardWork";
const db = getFirestore(fbConfig);

const Portfolio = () => {
  const [dataPortfolio, setdataPortfolio] = useState();
  const [filter, setfilter] = useState("all");
  const [showData, setshowData] = useState(6);

  const getDataPortfolio = async () => {
    const portfolioRef = collection(db, "portfolio");

    // ambil data
    const queryData = query(
      portfolioRef,
      orderBy("createdAt"),
      limitToLast(showData)
    );
    const querySnapshot = await getDocs(queryData);

    let data = [];

    // tambah data dari database
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setdataPortfolio(data);
  };

  useEffect(() => {
    getDataPortfolio();
  }, [showData]);

  return (
    <div className="pt-[80px]">
      <div className="bg-bg-100 w-full">
        <div className="max-w-6xl m-auto py-28 px-5">
          <div className="text-white font-bold text-center text-5xl mb-3">
            Portfolio
          </div>

          <div className="text-[#b7b7b7] text-center">
            Below are some of the projects, I have completed
          </div>
        </div>
      </div>

      {/* content */}
      <div className="bg-bg-200 w-full">
        <div className="max-w-6xl m-auto py-10 px-5">
          <div>
            {/* button header */}
            <div className="flex justify-center items-center gap-5 text-[#391400] flex-wrap mb-8">
              <div
                className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${
                  filter === "all" && "text-def-orange-300"
                }`}
                onClick={() => {
                  setfilter("all");
                }}
              >
                All
              </div>
              <div
                className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${
                  filter === "mobile" && "text-def-orange-300"
                }`}
                onClick={() => {
                  setfilter("mobile");
                }}
              >
                Mobile
              </div>
              <div
                className={`cursor-pointer p-4 hover:text-def-orange-100 ease-in-out duration-300 ${
                  filter === "website" && "text-def-orange-300"
                }`}
                onClick={() => {
                  setfilter("website");
                }}
              >
                Website
              </div>
            </div>

            {/* card */}
            <div className="flex justify-center items-center mt-6 flex-wrap gap-5">
              {dataPortfolio
                ?.filter((data) =>
                  filter === "all"
                    ? data
                    : data.project.toLowerCase() === filter.toLowerCase()
                )
                .map((res, index) => {
                  return (
                    <div key={"itemCardPorto" + index}>
                      <CardWork data={res} index={index} isHeight={false} />
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
