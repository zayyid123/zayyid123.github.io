'use client'
import React from "react";
import { useRouter } from "next/navigation";

const BreadCrumbAdmin = ({ dataLink }) => {
  const router = useRouter()

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <div
            className="cursor-pointer inline-flex items-center text-sm font-medium text-[#391400] hover:text-def-orange-300"
            onClick={() => {
              router.push('/admin')
            }}
          >
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-3 h-3 text-[#391400] mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <div
              className="cursor-pointer ml-1 text-sm font-medium text-[#391400] hover:text-def-orange-300 md:ml-2"
              onClick={() => {
                router.push(`${dataLink[0].link}`)
              }}
            >
              {dataLink[0].name}
            </div>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 text-[#391400] mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="ml-1 text-sm font-medium text-[#391400] md:ml-2">
              {dataLink[1].name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbAdmin;
