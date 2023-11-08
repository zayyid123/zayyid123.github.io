"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";

// config
import fbConfig from "@/app/config/firebase";
const db = getFirestore(fbConfig);

// components
import BreadCrumbAdmin from "@/app/admin/components/BreadCrumbsAdmin";
import Image from "next/image";

// third party
import QuillEditor from "@/app/admin/components/QuillEditor";
import Swal from "sweetalert2";
import cloudinary from "cloudinary/lib/cloudinary";

// api
import { UploadImage } from "@/app/services/cloudinary";

// setup cloudinary
cloudinary.config({
  cloud_name: "do3gqpixo",
  api_key: "458475118135567",
  api_secret: "xkypdZgxV1gA86q1IZDS1KV4m98",
});

// get date today
const getToday = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return (today = dd + "/" + mm + "/" + yyyy);
};

const PageEdit = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const itemsBreadCrumb = [
    {
      name: "Blog",
      link: "/admin/blog",
    },
    {
      name: "Edit Blog",
      link: "-",
    },
  ];
  const [category, setcategory] = useState();
  const [formData, setformData] = useState({
    title: "",
    sub_title: "",
    category: "",
    date: "",
    content: "",
  });
  const [imageUpload, setimageUpload] = useState({
    file: "",
    url: "",
  });
  const handleChangeFormData = (key, valueState) => {
    setformData({ ...formData, [key]: valueState });
  };

  const handleChangeBodyContent = (valueState) => {
    if (valueState !== "<p><br></p>") {
      setformData({ ...formData, content: valueState });
    } else {
      setformData({ ...formData, content: "" });
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChangePhoto = async (e) => {
    if (e.target.files[0] !== undefined) {
      if (e.target.files[0].size > 5000000) {
        alert(`Ukuran File ${e.target.files[0].size}`);
      } else {
        setimageUpload({
          file: e.target.files[0],
          url: await toBase64(e.target.files[0]),
        });
      }
    }
  };

  const deleteImageFromCloudinary = async (public_id) => {
    cloudinary.v2.uploader
      .destroy(public_id, function (error, result) {
        console.log(result, error);
      })
      .then((resp) => console.log(resp))
      .catch((_err) =>
        console.log("Something went wrong, please try again later.")
      );
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    if (formData.content !== "") {
      setisLoading(true);
      try {
        let dataToUpload = {};

        // ketika update beserta gambar
        if (imageUpload.file) {
          // remove image from cloudinary
          await deleteImageFromCloudinary(formData.image_public_id);

          // data image to upload form data
          const imageFormData = new FormData();
          imageFormData.append("file", imageUpload.file);
          imageFormData.append("upload_preset", "r6w2cmho");
          imageFormData.append("folder", "blog/");

          // upload
          const responseUploadImage = await UploadImage(imageFormData);

          // update data to upload
          dataToUpload = {
            ...formData,
            category: formData.category.toLowerCase(),
            date: getToday(),
            image: responseUploadImage.data.secure_url,
            image_public_id: responseUploadImage.data.public_id,
          };
        } else {
          dataToUpload = {
            ...formData,
            date: getToday(),
          };
        }

        // ref database
        const blogRef = doc(db, "blog", id);

        // upload to dtaabase
        await setDoc(blogRef, dataToUpload, { merge: true })
          .then(() => {
            setisLoading(false);
            Swal.fire({
              icon: "success",
              text: "Data anda berhasil disimpan",
              showConfirmButton: false,
            }).then(() => {
              router.push("/admin/blog");
            });
          })
          .catch((error) => {
            setisLoading(false);
            Swal.fire({
              icon: "error",
              text: error,
              showConfirmButton: false,
            }).then(() => {
              window.location.reload();
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error,
        });
      }
    } else {
      setisLoading(false);
      Swal.fire({
        icon: "error",
        text: "Maaf Content harus anda isi terlebih dahulu",
      });
    }
  };

  useEffect(() => {
    const getDataCategory = async () => {
      const categoryRef = collection(db, "category");

      // ambil data
      const queryData = query(categoryRef);
      const querySnapshot = await getDocs(queryData);

      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setcategory(data);
    };

    const getDetailBlog = async () => {
      const docRef = doc(db, "blog", id);
      const docSnap = await getDoc(docRef);

      setformData(docSnap.data());
      setimageUpload({ ...imageUpload, url: docSnap.data().image });
    };

    getDetailBlog();
    getDataCategory();
  }, []);

  return (
    <div>
      {/* breadcrumb */}
      {itemsBreadCrumb && <BreadCrumbAdmin dataLink={itemsBreadCrumb} />}

      {/* main */}
      <div className="mt-5">
        {/* title */}
        <div className="font-bold text-xl mb-3">Edit Data</div>

        {/* form */}
        <form
          onSubmit={(e) => {
            handleSubmitData(e);
          }}
        >
          <div className="flex justify-start items-start flex-wrap">
            {/* left */}
            <div className="w-[100%] sm:w-[47%] mr-0 sm:mr-4">
              {/* image */}
              <div className="mb-4">
                {/* image avatar */}
                <div className="bg-gray-100 p-2 flex justify-center rounded-lg">
                  {imageUpload.url && (
                    <Image
                      width={300}
                      height={400}
                      src={imageUpload.url}
                      alt={formData.title}
                    />
                  )}
                </div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none"
                  aria-describedby="file_input_help"
                  id="file_input"
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={(e) => {
                    handleChangePhoto(e);
                  }}
                />
                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                  SVG, PNG, JPG or GIF.
                </p>
              </div>

              {/* title */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title Blog
                </label>
                <input
                  value={formData.title}
                  type="text"
                  id="title"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100"
                  required
                  onChange={(e) => {
                    handleChangeFormData("title", e.target.value);
                  }}
                />
              </div>
            </div>

            {/* right */}
            <div className="w-[100%] sm:w-[47%] mr-0 sm:mr-4">
              {/* sub title */}
              <div className="mb-6">
                <label
                  htmlFor="sub_title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Sub Title Blog
                </label>
                <input
                  value={formData.sub_title}
                  type="text"
                  id="sub_title"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100"
                  required
                  onChange={(e) => {
                    handleChangeFormData("sub_title", e.target.value);
                  }}
                />
              </div>

              {/* category */}
              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Category
                </label>
                {category && (
                  <select
                    id="category"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => {
                      handleChangeFormData("category", e.target.value.toLowerCase());
                    }}
                    required
                  >
                    <option value={""}>Pilih Category</option>
                    {category.map((res, index) => (
                      <option key={"optionCategory" + index} selected={formData.category.toLowerCase() === res.name.toLowerCase()} value={res.name}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="block mb-2 text-sm font-medium text-gray-900">
              Content
            </div>
            <QuillEditor
              setText={handleChangeBodyContent}
              text={formData.content}
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

export default PageEdit;
