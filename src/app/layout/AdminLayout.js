"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { ChevronRightIcon, DocumentIcon } from "@heroicons/react/24/solid";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { Logout, user } = UserAuth();
  const [isOpen, setisOpen] = useState(false);

  return (
    <div>
      {user ? (
        <div>
          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#5a5a5ab5] ${
              !isOpen && "-translate-x-full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <div className="h-full w-64 z-50 px-3 py-4 overflow-y-auto bg-bg-100">
              {/* button */}
              <div
                className="group absolute top-2 right-[-33px] p-2 bg-[#3e4166] rounded-full cursor-pointer sm:hidden hover:bg-def-orange-300 ease-in-out duration-300"
                onClick={() => {
                  setisOpen(!isOpen);
                }}
              >
                <ChevronRightIcon
                  size={30}
                  color="#EF6D58"
                  className={`w-8 group-hover:text-white ease-in-out duration-300 ${
                    isOpen && "rotate-180"
                  }`}
                />
              </div>

              {/* menu */}
              <ul className="space-y-2 font-medium">
                <li>
                  <div
                    className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-def-orange-300 group ease-in-out duration-300"
                    onClick={() => {
                      router.push("/admin");
                      setisOpen(!isOpen);
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-white transition duration-75 group-hover:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ml-3 text-white group-hover:text-bg-100">
                      Dashboard
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-def-orange-300 group ease-in-out duration-300"
                    onClick={() => {
                      router.push("/admin/blog");
                      setisOpen(!isOpen);
                    }}
                  >
                    <DocumentIcon className="w-5 text-white hover:text-bg-100" />
                    <span className="ml-3 text-white group-hover:text-bg-100">
                      Blog
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-def-orange-300 group ease-in-out duration-300"
                    onClick={() => {
                      Logout();
                      setisOpen(!isOpen);
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-white transition duration-75 group-hover:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ml-3 text-white group-hover:text-bg-100">
                      Log Out
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64">
            <div className="p-4">{children}</div>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-screen flex justify-center items-center flex-col bg-bg-100"
        >
          <div className="text-white font-bold">Page Not Found</div>
          <div 
            className="mt-4 bg-def-orange-300 py-2 px-4 rounded-md font-semibold hover:bg-bg-200 cursor-pointer ease-in-out duration-300"
            onClick={() =>{
              router.push('/')
            }}
          >
            Go Back
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
