import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axiosInstance from "../axiosInstance.js";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const Blog = () => {
  const { blogid } = useParams();
  const [author, setAuthor] = useState({});
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/blog/${blogid}`);
        setAuthor(data.blog.author);
        setBlog(data.blog);
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
      <Toaster />
      <section>
        <div className="mt-10 mb-4">
          <p className="font-bold text-5xl">{blog.title}</p>
          <p className="mt-4">
            Author: <span className="font-semibold ">{author.fullname}</span>
          </p>
          <p>
            Published on:{" "}
            <span className="font-semibold">
              {moment(blog.createdAt).format("MMM Do YYYY")}
            </span>
          </p>
          <p className="text-blue-500 cursor-pointer">#{blog.tag}</p>
        </div>
        <div>
          <img src={blog.banner} className="aspect-video w-[70%] rounded-md" />
        </div>
        <div>
          <p className="w-[70%] my-6 font-normal text-xl">{blog.content}</p>
        </div>
      </section>
    </>
  );
};

export default Blog;
