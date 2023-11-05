"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

// components
import CardTotal from "../components/CardTotal";
import CardDataTable from "../components/CardDataTable";
import TableCustom from "../components/TableCustom";

// icon
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const PorfolioAdmin = () => {
  const router = useRouter()
  const [allDataPortfolio, setallDataPortfolio] = useState([]);
  const [search, setsearch] = useState("");
  const columns = [
    {
      name: "No",
      selector: (row) => allDataPortfolio.indexOf(row) + 1,
    },
    {
      name: "Judul",
      selector: (row) => row.name,
    },
    {
      name: "Kategori",
      selector: (row) => row.project,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex justify-start items-center">
            {/* edit */}
            <div
              className="text-white bg-yellow-500 p-1 m-1 rounded-lg cursor-pointer hover:bg-yellow-600"
              onClick={() => router.push(`/admin/portfolio/edit/${row.id}`)}
            >
              <PencilIcon className="w-6" />
            </div>

            {/* delete */}
            <div
              className="text-white bg-red-400 p-1 m-1 rounded-lg cursor-pointer hover:bg-red-600"
              // onClick={() => {
              //   removeBlog(row.id, row.image_public_id)
              // }}
            >
              <TrashIcon className="w-6" />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getAllDataPortfolio = async () => {
      const portfolioRef = collection(db, "portfolio");

      // ambil data
      const firstQuery = query(portfolioRef);
      const querySnapshot = await getDocs(firstQuery);

      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setallDataPortfolio(data);
    };

    getAllDataPortfolio();
  }, []);

  return (
    <div>
      {/* dashboard Portfolio */}
      <div className="flex justify-start flex-wrap mb-3">
        {allDataPortfolio && (
          <CardTotal title="Portfolio" count={allDataPortfolio.length} />
        )}
      </div>

      {/* main */}
      <CardDataTable
        title="Data Portfolio"
        countData={allDataPortfolio ? allDataPortfolio.length : 0}
        setsearch={setsearch}
        addData={() => {
          router.push("/admin/portfolio/add");
        }}
      >
        <div className="my-5">
          {allDataPortfolio && (
            <TableCustom
              columns={columns}
              data={allDataPortfolio.filter((data) =>
                data?.name?.toLowerCase().includes(search.toLowerCase())
              )}
            />
          )}
        </div>
      </CardDataTable>
    </div>
  );
};

export default PorfolioAdmin;
