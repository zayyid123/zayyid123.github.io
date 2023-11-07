import React from "react";
import { Link } from "react-router-dom";

const ButtonExploreMore = () => {
  return (
    <Link to={"/portfolio"}>
      <div className="font-bold text-sm text-white py-3 px-8 border border-[#747474] rounded-md cursor-pointer hover:bg-def-orange-300 hover:text-bg-100 hover:border-bg-100 ease-in-out duration-300">
        EXPLORE MORE
      </div>
    </Link>
  );
};

export default ButtonExploreMore;
