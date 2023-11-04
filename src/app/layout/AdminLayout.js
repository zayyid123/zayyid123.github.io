'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const router = useRouter()
  const [isOpen, setisOpen] = useState(false)

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden bg-bg-100 hover:bg-def-orange-300 focus:outline-none focus:ring-2"
        onClick={() => {
          setisOpen(!isOpen)
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-full sm:w-64 h-screen transition-transform bg-[#5a5a5ab5] ${!isOpen && '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
        onClick={() => {
          setisOpen(!isOpen)
        }}
      >
        <div className="h-full w-64 z-50 px-3 py-4 overflow-y-auto bg-bg-100">
          <ul className="space-y-2 font-medium">
            <li>
              <div
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-def-orange-300 group ease-in-out duration-300"
                onClick={() => {
                  router.push('/admin')
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
                <span className="ml-3 text-white group-hover:text-bg-100">Dashboard</span>
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-def-orange-300 group ease-in-out duration-300"
                onClick={() => {
                  router.push('/admin/blog')
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
                <span className="ml-3 text-white group-hover:text-bg-100">Blog</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
