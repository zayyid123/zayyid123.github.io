import React from "react";
import { Link } from "react-router-dom";

const ButtonSeeMyWork = () => {
  return (
    <Link to={"/portfolio"}>
      <div className="group bg-def-orange-300 hover:bg-gray-600 flex justify-center items-center w-fit px-5 py-3 rounded-md cursor-pointer ease-in-out duration-300">
        <p className="font-bold">SEE MY WORK</p>
      </div>
    </Link>
  );
};

export default ButtonSeeMyWork;
