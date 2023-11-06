"use client";
import React, { useEffect, useState } from "react";

const TableCustom = ({ columns, data }) => {
  const paginate = (arr, size) => {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  };

  let pages = paginate(data, 10);
  const [visibleData, setvisibleData] = useState();
  const [indexOfPages, setindexOfPages] = useState();

  useEffect(() => {
    setvisibleData(pages[0]);
    setindexOfPages(0);
  }, [data]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-bg-100">
          <tr>
            {columns.map((res, index) => (
              <th key={"headTable" + index} scope="col" className="px-6 py-3">
                {res.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData &&
            visibleData.map((res, index) => (
              <tr
                key={"itemTable" + index}
                className={`${
                  index % 2 === 1 ? "bg-slate-100" : "bg-white"
                } border-b`}
              >
                {columns.map((resCol, indexCol) => (
                  <th
                    key={"innerItemCol" + indexCol}
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {resCol.selector(res)}
                  </th>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 ">
          Showing <span className="font-semibold">1-10</span> of{" "}
          <span className="font-semibold">{data.length}</span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li
            onClick={() => {
              if (indexOfPages !== 0) {
                setvisibleData(pages[indexOfPages - 1]);
                setindexOfPages(indexOfPages - 1);
              }
            }}
          >
            <div
              className={`flex items-center justify-center px-3 h-8 ml-0 border border-gray-300 rounded-l-lg ${
                indexOfPages === 0
                  ? "bg-bg-100 text-white cursor-default"
                  : "cursor-pointer hover:bg-bg-200 text-bg-100"
              }`}
            >
              Previous
            </div>
          </li>
          {pages &&
            pages.map((res, index) => (
              <li
                key={"itemPaginate" + index}
                onClick={() => {
                  setvisibleData(pages[index]);
                  setindexOfPages(index);
                }}
              >
                <div
                  className={`flex items-center justify-center px-3 h-8 ml-0 border border-gray-300 ${
                    indexOfPages === index
                      ? "bg-bg-100 text-white cursor-default"
                      : "cursor-pointer hover:bg-bg-200 text-bg-100"
                  }`}
                >
                  {index + 1}
                </div>
              </li>
            ))}
          <li
            onClick={() => {
              if (indexOfPages + 1 !== pages.length) {
                setvisibleData(pages[indexOfPages + 1]);
                setindexOfPages(indexOfPages + 1);
              }
            }}
          >
            <div
              className={`flex items-center justify-center px-3 h-8 ml-0 border border-gray-300 rounded-r-lg ${
                indexOfPages + 1 === pages.length
                  ? "bg-bg-100 text-white cursor-default"
                  : "cursor-pointer hover:bg-bg-200 text-bg-100"
              }`}
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TableCustom;
