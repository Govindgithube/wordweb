import { useContext } from "react";
import { EditorContext } from "../pages/Editor";
import { UserContext } from "../context/UserContextProvider";
import toast, { Toaster } from "react-hot-toast";

import axiosInstance from "../axiosInstance.js";

import demoBanner from "../assets/images/banner/blog-banner.png";
import { useNavigate } from "react-router-dom";

const PublishBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {
    blog,
    blog: { title, banner, content, tag, description },
    setBlog,
  } = useContext(EditorContext);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setBlog({ ...blog, description: text });
  };

  const handlePublishBlog = async (e) => {
    e.preventDefault();

    const body = {
      title: title,
      description: description,
      content: content,
      banner: banner,
      tag: tag,
    };

    const token = user;

    try {
      const { data } = await axiosInstance.post("/api/v1/blog/new", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/");
      if (data.success == true) {
        toast.success(`${data.message}`);
      }
    } catch (err) {
      toast.error(err.message);
      toast.error(err.response.data.message);
    }
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;

    setBlog({ ...blog, tag: tag });
  };

  return (
    <>
      <Toaster />
      <section className="flex items-center justify-center h-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-[100%]">
          <div className="w-[50%]">
            <div className="">
              <p className="publish_labels my-4">Preview</p>
              <img
                src={banner === "" ? demoBanner : banner}
                alt="banner-image"
                className="aspect-video w-full rounded-lg"
              />
            </div>
            <p className="publish_title">{title ? title : "Blog Title"}</p>
            <p className="overflow-y-scroll h-[150px] no-scrollbar">
              {description ? description : "Blog Description"}
            </p>
          </div>
          <div className="w-[50%]">
            <form>
              <label htmlFor="blogTitle">
                <p className="publish_labels mt-6 mb-2">Blog Title</p>
                <input
                  type="text"
                  value={title}
                  id="blogTitle"
                  className="publish_input"
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                />
              </label>

              <label htmlFor="blogDescription">
                <p className="publish_labels mt-6 mb-2">
                  Short Description about your post
                </p>
                <textarea
                  className="publish_input resize-none h-[200px]"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </label>

              <label htmlFor="blogTags">
                <p className="publish_labels mt-6 mb-2">
                  Topic - ( Helps in searching and ranking your post )
                </p>
                <input
                  type="text"
                  className="publish_input"
                  onChange={handleTagChange}
                />
              </label>

              <button
                type="submit"
                onClick={handlePublishBlog}
                className="btn-dark text-sm px-8 py-3 mt-4"
              >
                Publish
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublishBlog;
