import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance.js";

import { UserContext } from "../context/UserContextProvider";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogUpdateForm = ({ oldBlog, blogId }) => {
  const navigate = useNavigate();
  const { title, content, tag } = oldBlog;
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    const { title, content, tag } = oldBlog;
    if (oldBlog) {
      setNewTitle(title);
      setNewContent(content);
      setNewTag(tag);
    }
  }, [oldBlog]);

  const handleBlogUpdate = async () => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/blog/${blogId}`,
        {
          title: newTitle,
          content: newContent,
          tag: newTag,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );

      navigate("/");
      if (data.success) {
        toast.success(`${data.message}`);
      }
    } catch (err) {
      toast.error(err.message);
      if (err.response.data.success == false) {
        toast.error(`${err.response.data.message}`);
      }
    }
  };

  return (
    <>
      <Toaster />
      <form
        className="flex flex-col w-[50%] gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="title">
          <p className="publish_labels text-black font-semibold text-xl py-2">
            New Title
          </p>
          <input
            id="title"
            type="text"
            placeholder="New Title"
            className="input_field w-full"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>

        <label htmlFor="content">
          <p className="publish_labels text-black font-semibold text-xl py-2">
            New Content
          </p>
          <textarea
            id="content"
            placeholder="New Content"
            className="input_field w-full h-[45vh] no-scrollbar"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </label>

        <label htmlFor="tag">
          <p className="publish_labels text-black font-semibold text-xl py-2">
            New Tag
          </p>
          <input
            type="text"
            placeholder="New Tag"
            className="input_field w-full"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            id="tag"
          />
        </label>

        <button
          type="submit"
          className="border-2 border-black rounded-full bg-black text-white font-semibold text-md p-2 hover:bg-white hover:text-black my-2"
          onClick={handleBlogUpdate}
        >
          Update Blog
        </button>
      </form>
    </>
  );
};

export default BlogUpdateForm;
