import axiosInstance from "../axiosInstance.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogUpdateForm from "../components/BlogUpdateForm";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const [oldBlog, setOldBlog] = useState({});
  const { blogid } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/blog/${blogid}`);
        setOldBlog(data.blog);
      } catch (err) {
        toast.error(err.message);
        if (err.response.data.success == false) {
          toast.error(`${err.response.data.message}`);
        }
      }
    };

    fetchBlogDetails();
  }, []);

  return (
    <>
      <section>
        <div className="flex items-center justify-center">
          <BlogUpdateForm oldBlog={oldBlog} blogId={blogid} />
        </div>
      </section>
    </>
  );
};

export default UpdateBlog;
