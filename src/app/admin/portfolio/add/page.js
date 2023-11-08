"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";

// config
import fbConfig from "@/app/config/firebase";
const db = getFirestore(fbConfig);

// third party
import Swal from "sweetalert2";

// components
import BreadCrumbAdmin from "../../components/BreadCrumbsAdmin";

// function get today
const getToday = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return (today = dd + "/" + mm + "/" + yyyy);
};

const AddPortfolio = () => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)
  const [formData, setformData] = useState({
    name: "",
    project: "",
    image: "",
    link: "",
    github: "",
    createdAt: getToday(),
    description: "",
  });

  const handleChangeFormData = (key, valueState) => {
    setformData({ ...formData, [key]: valueState });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    setisLoading(true)
    try {
      // ref database
      const portfolioRef = doc(collection(db, "portfolio"));

      // upload to dtaabase
      await setDoc(portfolioRef, 
        {
          ...formData,
          project: formData.project.toLowerCase()
        })
        .then(() => {
          setisLoading(false)
          Swal.fire({
            icon: 'success',
            text: 'Data anda berhasil disimpan',
            showConfirmButton: false
          }).then(() => {
            router.push('/admin/portfolio')
          });
        }).catch((error) => {
          setisLoading(false)
          Swal.fire({
              icon: 'error',
              text: error,
              showConfirmButton: false
          }).then(() => {
            window.location.reload();
          });
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error
      });
      setisLoading(false)
    }
  }

  return (
    <div>
      {/* breadcrumbs */}
      <BreadCrumbAdmin
        dataLink={[
          {
            name: "Portfolio",
            link: "/admin/portfolio",
          },
          {
            name: "Add Portfolio",
            link: "-",
          },
        ]}
      />

      {/* content */}
      <div className="mt-5">
        {/* title */}
        <div className="font-bold text-xl mb-3">Add Data</div>

        {/* form */}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex justify-start items-start flex-wrap">
            {/* left */}
            <div className="w-[100%] sm:w-[47%] mr-0 sm:mr-4">
              {/* name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name Portfolio
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100"
                  required
                  onChange={(e) => {
                    handleChangeFormData("name", e.target.value);
                  }}
                />
              </div>

              {/* image */}
              <div className="mb-6">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100"
                  required
                  onChange={(e) => {
                    handleChangeFormData("image", e.target.value);
                  }}
                />
              </div>

              {/* link */}
              <div className="mb-6">
                <label
                  htmlFor="link"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100"
                  required
                  onChange={(e) => {
                    handleChangeFormData("link", e.target.value);
                  }}
                />
              </div>
            </div>

            {/* right */}
            <div className="w-[100%] sm:w-[47%] mr-0 sm:mr-4">
              {/* Github */}
              <div className="mb-6">
                <label
                  htmlFor="github"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Github
                </label>
                <input
                  type="text"
                  id="github"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100"
                  required
                  onChange={(e) => {
                    handleChangeFormData("github", e.target.value);
                  }}
                />
              </div>

              {/* category */}
              <div className="mb-6">
                <label
                  htmlFor="project"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Project
                </label>
                <select
                  id="project"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    handleChangeFormData("project", e.target.value);
                  }}
                  required
                >
                  <option value={""}>Choice Category</option>
                  <option value={"Mobile"}>Mobile</option>
                  <option value={"Website"}>Website</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100 min-h-[120px]"
              required
              onChange={(e) => {
                handleChangeFormData("description", e.target.value);
              }}
            />
          </div>

          {/* button */}
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-bg-100 text-white hover:bg-def-orange-300 text-def-100 hover:text-def-400 p-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolio;
