import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";
import BreadCrumbUser from "../../components/BreadCrumbUser";

// icon
import IconGithub from "../../assets/icon/sosmed/github_black.svg";
import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/24/solid";

// config
import fbConfig from "../../config/firebase";
const db = getFirestore(fbConfig);

const DetailPortfolio = ({ params }) => {
  const { id } = useParams();
  const [detailPortfolio, setdetailPortfolio] = useState();

  useEffect(() => {
    const getDetailPortfolio = async () => {
      const docRef = doc(db, "portfolio", id);
      const docSnap = await getDoc(docRef);

      setdetailPortfolio(docSnap.data());
    };

    getDetailPortfolio();
  }, []);

  return (
    <div className="bg-bg-200 w-full">
      <div className="max-w-6xl m-auto py-28 px-5">
        {/* breadcrumb */}
        <BreadCrumbUser
          dataLink={[
            {
              name: "Portfolio",
              link: "/portfolio",
            },
            {
              name: "Detail",
              link: "-",
            },
          ]}
        />

        {/* detail info */}
        <div className="mt-8">
          <div className="flex justify-between items-start gap-8 flex-col md:flex-row">
            {/* image */}
            <div className="w-[100%] md:w-[50%]">
              {detailPortfolio && (
                <img
                  src={detailPortfolio.image}
                  alt={detailPortfolio.name}
                  width={600}
                  height={500}
                  className="object-cover rounded-md drop-shadow-md"
                />
              )}
            </div>

            {/* information */}
            <div className="w-[100%] md:w-[50%] flex flex-col justify-start text-[#391400]">
              {/* name */}
              <div className="font-bold text-3xl">{detailPortfolio?.name}</div>

              {/* category */}
              <div className="mt-4 font-semibold px-4 py-2 bg-def-orange-300 w-fit rounded-full text-white">
                {detailPortfolio?.project}
              </div>

              {/* description */}
              <div className="mt-4">{detailPortfolio?.description}</div>

              <div className="border-b-2 border-[#391400] my-4"></div>

              {/* download */}
              <div className="flex justify-start items-center gap-4 flex-wrap">
                {/* github */}
                <div>
                  {detailPortfolio?.github !== "-" && (
                    <a
                      href={detailPortfolio?.github}
                      target="_blank"
                      className="bg-white hover:bg-gray-300 ease-in-out duration-300 px-4 py-2 w-fit drop-shadow-md rounded-full flex justify-center items-center cursor-pointer" rel="noreferrer"
                    >
                      <img
                        src={IconGithub}
                        alt="icon github"
                        className="w-6"
                      />
                      <div className="ml-2 mt-1">Github Repo</div>
                    </a>
                  )}
                </div>

                {/* download */}
                <div>
                  {detailPortfolio?.link.includes("drive.google.com") ? (
                    <a
                      href={detailPortfolio?.link}
                      target="_blank"
                      className="bg-white hover:bg-gray-300 ease-in-out duration-300 px-4 py-2 w-fit drop-shadow-md rounded-full flex justify-center items-center cursor-pointer" rel="noreferrer"
                    >
                      <ArrowDownTrayIcon
                        size={30}
                        color="#000"
                        fill="#000"
                        className="w-6"
                      />
                      <div className="ml-2 mt-1">Link Download</div>
                    </a>
                  ) : (
                    <a
                      href={detailPortfolio?.link}
                      target="_blank"
                      className="bg-white hover:bg-gray-300 ease-in-out duration-300 px-4 py-2 w-fit drop-shadow-md rounded-full flex justify-center items-center cursor-pointer" rel="noreferrer"
                    >
                      <LinkIcon
                        size={30}
                        color="#000"
                        fill="#000"
                        className="w-6"
                      />
                      <div className="ml-2 mt-1">Link</div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPortfolio;
