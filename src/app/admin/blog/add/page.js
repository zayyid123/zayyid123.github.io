'use client'
import React, { useEffect, useState } from "react";
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
import QuillEditor from "../../components/QuillEditor";
import Swal from "sweetalert2";

// components
import BreadCrumbAdmin from "../../components/BreadCrumbsAdmin";
import Image from "next/image";

// api
import { UploadImage } from "@/app/services/cloudinary";

// function get today
const getToday = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return today = dd + '/' + mm + '/' + yyyy;
}

const AddBlogPage = () => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)
  const [category, setcategory] = useState()
  const [formData, setformData] = useState({
    title: '',
    sub_title: '',
    category: '',
    date: getToday(),
    content: '',
  })
  const [imageUpload, setimageUpload] = useState({
    file: '',
    url: 'https://placehold.co/600x400.png'
  })

  const handleChangeFormData = (key, valueState) => {
    setformData({ ...formData, [key]: valueState })
  }

  const handleChangeBodyContent = (valueState) => {
    if (valueState !== '<p><br></p>') {
      setformData({ ...formData, 'content': valueState })
    } else {
      setformData({ ...formData, 'content': '' })
    }
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

  const handleChangePhoto = async(e) => {
    if (e.target.files[0] !== undefined) {
      if (e.target.files[0].size > 5000000) {
          alert(`Ukuran File ${e.target.files[0].size}`)
      }else{
        setimageUpload({
          file: e.target.files[0],
          url: await toBase64(e.target.files[0])
        })
      }
    }
  }

  const handleSubmitData = async(e) => {
    e.preventDefault()
    if (formData.content !== '') {
      if (imageUpload.file !== '') {
        setisLoading(true)
        try {
          // ref database
          const blogRef = doc(collection(db, "blog"));

          // data image to upload
          const imageFormData = new FormData()
          imageFormData.append('file', imageUpload.file);
          imageFormData.append('upload_preset','r6w2cmho');
          imageFormData.append('folder', 'blog/')

          // upload
          const responseUploadImage = await UploadImage(imageFormData)

          // upload to dtaabase
          await setDoc(blogRef, 
            {
              ...formData, 
              category: formData.category.toLowerCase(),
              image: responseUploadImage.data.secure_url,
              image_public_id: responseUploadImage.data.public_id
            })
            .then(() => {
              setisLoading(false)
              Swal.fire({
                icon: 'success',
                text: 'Data anda berhasil disimpan',
                showConfirmButton: false
              }).then(() => {
                router.push('/admin/blog')
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
        }
      } else {
        setisLoading(false)
        Swal.fire({
          icon: 'error',
          text: 'Maaf Image harus anda isi terlebih dahulu'
        });
      }
    } else {
      setisLoading(false)
      Swal.fire({
        icon: 'error',
        text: 'Maaf Content harus anda isi terlebih dahulu'
      });
    }
  }

  useEffect(() => {
    const getDataCategory = async() => {
      const categoryRef = collection(db, "category")

      // ambil data
      const queryData = query(categoryRef)
      const querySnapshot = await getDocs(queryData);

      let data = []
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setcategory(data)
    }

    getDataCategory()
  }, [])

  return (
    <div>
      {/* breadcrumbs */}
      <BreadCrumbAdmin
        dataLink={[
          {
            name: "Blog",
            link: "/admin/blog",
          },
          {
            name: "Add Blog",
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
          onSubmit={(e) => {handleSubmitData(e)}}
        >
          <div className="flex justify-start items-start flex-wrap">
            {/* left */}
            <div className="w-[100%] sm:w-[47%] mr-0 sm:mr-4">
              {/* image */}
              <div className="mb-4">
                {/* image avatar */}
                <div className="bg-gray-100 p-2 flex justify-center rounded-lg">
                  <Image
                    width={300}
                    height={400}
                    src={imageUpload.url}
                    alt={formData.title}
                  />
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
                  required
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
                      handleChangeFormData("category", e.target.value);
                    }}
                    required
                  >
                    <option value={""}>Pilih Category</option>
                    {category.map((res, index) => (
                      <option key={"optionCategory" + index} value={res.name}>
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

export default AddBlogPage;
