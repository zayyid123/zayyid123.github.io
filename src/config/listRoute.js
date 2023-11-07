import Blog from "../pages/blog/Blog";
import DetailBlog from "../pages/blog/DetailBlog";
import Home from "../pages/home/Home";
import DetailPortfolio from "../pages/portfolio/DetailPortfolio";
import Portfolio from "../pages/portfolio/Portfolio";

const list = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/blog/:judul/:id",
    name: "Detail Blog",
    component: DetailBlog,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/portfolio/detail/:id",
    name: "Detail Portfolio",
    component: DetailPortfolio,
  },
];

export default list;
