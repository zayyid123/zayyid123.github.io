"use client";
import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbUser = ({ dataLink }) => {
  return (
    <div className="flex" aria-label="Breadcrumb">
      <div className="inline-flex items-center space-x-1 md:space-x-3">
        <div className="inline-flex items-center">
          <Link to={"/"}>
            <div className="cursor-pointer inline-flex items-center text-sm font-medium text-[#391400] hover:text-def-orange-300">
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
          </Link>
        </div>
        <div>
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
            <Link to={`${dataLink[0].link}`}>
              <div className="cursor-pointer ml-1 text-sm font-medium text-[#391400] hover:text-def-orange-300 md:ml-2">
                {dataLink[0].name}
              </div>
            </Link>
          </div>
        </div>
        <div aria-current="page">
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
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbUser;
