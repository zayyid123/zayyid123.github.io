import React from "react";
import BreadCrumbAdmin from "../../components/BreadCrumbsAdmin";
import BlogViewer from "../../components/BlogViewer/BlogViewer";

const DetailPage = ({ params }) => {
  const { id } = params;
  const itemsBreadCrumb = [
    {
      name: "Blog",
      link: "/admin/blog",
    },
    {
      name: "Detail",
      link: "-",
    },
  ];

  return (
    <div>
      {/* breadcrumb */}
      <div className="mb-5">
        {itemsBreadCrumb && <BreadCrumbAdmin dataLink={itemsBreadCrumb} />}
      </div>

      {/* content */}
      <BlogViewer id={id}/>
    </div>
  );
};

export default DetailPage;
