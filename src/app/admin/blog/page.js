"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

// config
import fbConfig from "@/app/config/firebase";
const db = getFirestore(fbConfig);

// icon
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// third party
import Swal from "sweetalert2";
import cloudinary from "cloudinary/lib/cloudinary";

// componenets
import CardTotal from "../components/CardTotal";
import CardDataTable from "../components/CardDataTable";
import TableCustom from "../components/TableCustom";

// setup cloudinary
cloudinary.config({
  cloud_name: "do3gqpixo",
  api_key: "458475118135567",
  api_secret: "xkypdZgxV1gA86q1IZDS1KV4m98",
});

const PageBlogAdmin = () => {
  const router = useRouter();
  const [allDataBlog, setallDataBlog] = useState([]);
  const [search, setsearch] = useState("");
  const columns = [
    {
      name: "No",
      selector: (row) => allDataBlog.indexOf(row) + 1,
    },
    {
      name: "Judul",
      selector: (row) => row.title,
    },
    {
      name: "Kategori",
      selector: (row) => row.category,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex justify-start items-center">
            {/* detail */}
            <div
              className="text-white bg-blue-400 p-1 m-1 rounded-lg cursor-pointer hover:bg-blue-600"
              // onClick={() => router.push(`/dashboard-admin/blog/${row.id}`)}
            >
              <EyeIcon className="w-6" />
            </div>

            {/* edit */}
            <div
              className="text-white bg-yellow-500 p-1 m-1 rounded-lg cursor-pointer hover:bg-yellow-600"
              // onClick={() => router.push(`/dashboard-admin/blog/edit/${row.id}`)}
            >
              <PencilIcon className="w-6" />
            </div>

            {/* delete */}
            <div
              className="text-white bg-red-400 p-1 m-1 rounded-lg cursor-pointer hover:bg-red-600"
              onClick={() => {
                removeBlog(row.id, row.image_public_id)
              }}
            >
              <TrashIcon className="w-6" />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getAllDataBlog = async () => {
      const blogRef = collection(db, "blog")

      // ambil data
      const firstQuery = query(blogRef)
      const querySnapshot = await getDocs(firstQuery);

      let data = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setallDataBlog(data)
    }

    getAllDataBlog()
  }, [])

  const deleteImageFromCloudinary = async (public_id) => {
    cloudinary.v2.uploader.destroy(public_id, function(error,result) {
      console.log(result, error) })
      .then(resp => console.log(resp))
      .catch(_err=> console.log("Something went wrong, please try again later."));
  }

  const removeBlog = (uid, image_public_id) => {
    Swal.fire({
      title: 'Yakin ingin menhapus data?',
      text: "Anda tidak akan bisa mengembalikan data ini lagi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tetap, Hapus!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        // delete image
        await deleteImageFromCloudinary(image_public_id)
          .then(async() => {
            // delete data
            await deleteDoc(doc(db, "blog", uid))
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Data anda berhasil dihapus'
              }).then((result) => {
                if (result.isConfirmed == true) {
                    window.location.reload();
                }
              });
            }).catch((error) => {
              Swal.fire({
                  icon: 'error',
                  text: error
              });
            });
          }).catch((error) => {
            Swal.fire({
                icon: 'error',
                text: error
            });
          });
      }
    });
  };

  return (
    <div>
      {/* dashboard blog */}
      <div className="flex justify-start flex-wrap mb-3">
        {allDataBlog && (
          <CardTotal title="Blog" count={allDataBlog.length} />
        )}
      </div>

      {/* tabel */}
      <CardDataTable
        title="Data Blog"
        countData={allDataBlog ? allDataBlog.length : 0}
        setsearch={setsearch}
        addData={() => {
          router.push("/admin/blog/add");
        }}
      >
        <div className="my-5">
          {allDataBlog && (
            <TableCustom
              columns={columns}
              data={allDataBlog.filter((data) =>
                data?.title?.toLowerCase().includes(search.toLowerCase())
              )}
            />
          )}
        </div>
      </CardDataTable>
    </div>
  );
};

export default PageBlogAdmin;
