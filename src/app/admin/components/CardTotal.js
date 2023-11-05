import React from "react";

const CardTotal = ({ title = "title", count = 1 }) => {
  return (
    <div className={`w-[200px] rounded-lg shadow-lg m-2`}>
      {/* title */}
      <div
        className={`bg-bg-100 text-white text-lg rounded-t-lg p-2 capitalize`}
      >
        {title} :
      </div>
      <div className="text-center text-2xl font-bold p-2">{count}</div>
    </div>
  );
};

export default CardTotal;
