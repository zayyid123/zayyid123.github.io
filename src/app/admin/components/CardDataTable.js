"use client";
import { useRouter } from "next/navigation";
import React from "react";

// icon
import { PlusIcon } from "@heroicons/react/24/solid";

const CardDataTable = ({
  title = "Title",
  countData = 0,
  setsearch,
  addData = null,
  children,
}) => {
  const router = useRouter();

  return (
    <div className="shadow-lg shadow-def-300 p-3 rounded-lg bg-gray-100">
      {/* Haed */}
      <div className="flex justify-between xs:flex-nowrap flex-wrap items-start mb-2 px-2">
        {/* title */}
        <div>
          <div className="text-def-500 font-bold text-xl">{title}</div>
          <div className="text-def-400 font-light">
            Total Data : {countData}
          </div>
        </div>

        {/* search */}
        <div className="flex justify-end items-center">
          {/* search form */}
          <div>
            <label
              htmlFor="searchData"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="searchData"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-def-400 focus:border-def-500"
                placeholder="Search Data"
                required
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
            </div>
          </div>

          {/* button add data */}
          {addData && (
            <div onClick={() => addData()}>
              <div className="p-2 bg-bg-100 ml-2 rounded-lg cursor-pointer hover:bg-def-100 hover:text-def-400">
                <PlusIcon className="w-6 text-def-orange-300" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* body */}
      <div className="overflow-x-scroll">
        <div className="min-w-[800px]">{children}</div>
      </div>
    </div>
  );
};

export default CardDataTable;
