"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

// config
import fbConfig from "../config/firebase";
const db = getFirestore(fbConfig);

const FormContact = () => {
  const [state, setstate] = useState({
    email: "",
    message: "",
  });

  const handleChangeState = (key, value) => {
    setstate({ ...state, [key]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // ref database
      const formRef = doc(collection(db, "form"));

      // upload to dtaabase
      await setDoc(formRef, 
        {
          ...state
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            text: 'Data anda berhasil disimpan',
            showConfirmButton: false
          })
        }).catch((error) => {
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
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="mb-3">
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-def-orange-300 text-gray-900 text-sm rounded-md block w-full p-2.5"
          placeholder="Your Email"
          required
          onChange={(e) => {
            handleChangeState("email", e.target.value);
          }}
        />
      </div>
      <div>
        <textarea
          type="text"
          id="message"
          className="bg-gray-50 border border-def-orange-300 text-gray-900 text-sm rounded-md block w-full p-2.5 min-h-[200px]"
          placeholder="Message"
          required
          onChange={(e) => {
            handleChangeState("message", e.target.value);
          }}
        />
      </div>

      {/* button submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="py-3 px-8 bg-def-orange-300 text-white drop-shadow-lg rounded-md font-bold mt-7 cursor-pointer hover:text-def-orange-300 hover:bg-bg-100 ease-in-out duration-300"
        >
          Submit Now
        </button>
      </div>
    </form>
  );
};

export default FormContact;