import React from "react";
import { Link } from "react-router-dom";

const CardWork = ({ data, index, isHeight = true }) => {
  return (
    <Link to={`/portfolio/detail/${data.id}`}>
      <div
        className={`group bg-def-orange-100 max-w-[330px] ${
          isHeight ? "h-[500px]" : "h-[300px]"
        } rounded-md relative overflow-hidden cursor-pointer drop-shadow-md`}
      >
        <img
          src={data.image}
          alt={`item porto ${index}`}
          width={300}
          height={600}
          className="object-cover w-full h-full rounded-md transform group-hover:scale-110 ease-in-out duration-300"
        />
        <div className="absolute bottom-5 left-5 z-10">
          <div className="bg-white group-hover:bg-def-orange-300 group-hover:text-white ease-in-out duration-300 drop-shadow-lg text-center rounded-full text-bg-100 py-1 px-4 mb-1 w-fit">
            <div className="capitalize">{data.project}</div>
          </div>
          <div className="text-white group-hover:text-def-orange-300 ease-in-out duration-300 drop-shadow-md font-bold text-xl px-1">
            {data.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardWork;
