"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

// config
import fbConfig from "@/app/config/firebase";
const db = getFirestore(fbConfig);

// css
import "./blog.css";

// third party
import parse from "html-react-parser";

// components
import BreadCrumbUser from "@/app/components/BreadCrumbUser";
import Image from "next/image";

// image
import PhotoCv from "@/assets/image/foto_cv.png";

// icon
import IconFacebook from "@/assets/icon/sosmed/facebook.svg";
import IconInstagram from "@/assets/icon/sosmed/instagram.svg";
import IconLinkedin from "@/assets/icon/sosmed/linkedin.svg";
import IconGithub from "@/assets/icon/sosmed/github.svg";
import IconPick from '@/assets/image/pick.png'
import RelatedBlog from "./RelatedBlog";

const MainDetailBlog = ({ id }) => {
  const [detailBlog, setdetailBlog] = useState();

  useEffect(() => {
    const getDetailBlog = async () => {
      const docRef = doc(db, "blog", id);
      const docSnap = await getDoc(docRef);

      setdetailBlog(docSnap.data());
    };

    getDetailBlog();
  }, []);

  return (
    <div id="blog_detail" className="bg-bg-200 w-full">
      <div className="max-w-6xl m-auto py-28 px-5">
        {/* breadcrumb */}
        <BreadCrumbUser
          dataLink={[
            {
              name: "Blog",
              link: "/blog",
            },
            {
              name: "Detail",
              link: "-",
            },
          ]}
        />

        {/* main */}
        {detailBlog && (
          <div className="mt-8 text-[#391400] max-w-4xl m-auto">
            {/* title */}
            <div className="font-bold text-4xl lg:text-5xl mb-1">
              {detailBlog.title}
            </div>

            {/* sub title */}
            <div className="text-xl mb-7 font-light">
              {detailBlog.sub_title}
            </div>

            {/* pembuat dan tangal dibuat */}
            <div className="flex justify-between items-center mb-8 font-light flex-col sm:flex-row">
              <div>Oleh: Mochamad Muzayyid Al Hakim</div>
              <div>{detailBlog.date}</div>
            </div>

            {/* image */}
            <div className="w-full flex justify-center mb-8">
              <Image
                src={detailBlog.image}
                alt={detailBlog.title}
                width={300}
                height={300}
                className="w-full max-w-3xl"
              />
            </div>

            {/* content */}
            <article className="prose max-w-none">
              {parse(`${detailBlog.content}`)}
            </article>

            {/* devider */}
            <div className="border-b border-def-orange-300 my-10" />

            {/* penulis */}
            <div className="flex justify-between items-center flex-col sm:flex-row gap-5">
              <div className="flex justify-between items-center gap-4">
                {/* image */}
                <div className="w-32 h-32 bg-def-orange-100 rounded-full overflow-hidden flex justify-center items-start">
                  <Image src={PhotoCv} alt="photo cv" className="w-28" />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="font-semibold">
                    Mochamad Muzayyid Al Hakim
                  </div>
                  <div className="font-light">Penulis</div>
                </div>
              </div>

              {/* sosmed */}
              <div className="flex justify-between items-center">
                {/* fb */}
                <a
                  href="https://www.facebook.com/mochamad.zayyid"
                  target="_blank"
                  className="bg-def-orange-300 mx-1 rounded-full cursor-pointer hover:bg-[#32334c] ease-in-out duration-300"
                >
                  <Image src={IconFacebook} alt="fb" className="w-[33px]" />
                </a>

                {/* ig */}
                <a
                  href="https://www.instagram.com/zayyid_123/"
                  target="_blank"
                  className="bg-def-orange-300 mx-1 rounded-full cursor-pointer hover:bg-[#32334c] ease-in-out duration-300"
                >
                  <Image src={IconInstagram} alt="ig" className="w-[33px]" />
                </a>

                {/* linkedin */}
                <a
                  href="https://www.linkedin.com/in/mochamad-zayyid/"
                  target="_blank"
                  className="bg-def-orange-300 mx-1 rounded-full p-[2px] cursor-pointer hover:bg-[#32334c] ease-in-out duration-300"
                >
                  <Image
                    src={IconLinkedin}
                    alt="linkedin"
                    className="w-[30px]"
                  />
                </a>

                {/* github */}
                <a
                  href="https://github.com/zayyid123"
                  target="_blank"
                  className="mx-[2.5px] bg-def-orange-300 p-[5.5px] rounded-full cursor-pointer hover:bg-[#32334c] ease-in-out duration-300"
                >
                  <Image src={IconGithub} alt="github" className="w-[25px]" />
                </a>
              </div>
            </div>

            {/* quotes */}
            <div
              className="bg-[#f9e5da] my-16 py-5 px-8 flex justify-center items-start gap-5"
            >
              <Image src={IconPick} alt="icon pick"/>
              <div className="text-xl">Hidup yang tidak pernah dipertaruhkan, tidak akan pernah dimenangkan</div>
            </div>

            {/* related Blog */}
            <div>
              <RelatedBlog/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDetailBlog;
