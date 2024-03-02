import moment from "moment";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosInstance.js";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

import { toast } from "react-hot-toast";

const BlogCard = ({ post, renderingOn, author, authorId, authorEmail }) => {
  const { title, banner, description, createdAt, tag } = post;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post._id}`);
  };
  const handleAuthorClick = () => {
    navigate(`/user-profile/${authorId}`);
  };

  const handleUpdate = () => {
    navigate(`/update-blog/${post._id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/blog/${post._id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

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
      <div className="flex gap-2 border-b m-2 p-4 cursor-pointer">
        <div className={renderingOn === "Home" ? "w-full" : "w-[70%]"}>
          <p
            className="text-sm font-semibold mt-2 mb-1"
            onClick={handleAuthorClick}
          >
            {author}
          </p>
          <p
            className="font-bold sm:text-2xl text-lg mt-2"
            onClick={handleClick}
          >
            {title}
          </p>
          <p
            className="text-sm mt-2 mb-2 text-ellipsis lg:whitespace-normal whitespace-nowrap overflow-hidden line-clamp-3"
            onClick={handleClick}
          >
            {description}
          </p>
          <p className="text-blue-500 font-medium text-sm my-2 cursor-pointer">
            #{tag}
          </p>
          <p className="text-sm font-semibold">
            {moment(createdAt).format("MMM Do YYYY")}
          </p>
          {authorId && authorId == post.author ? (
            <div className="flex gap-4 mt-4">
              <p
                className="font-medium border border-blue-400 rounded-full px-4 py-1 bg-blue-500 text-white text-sm"
                onClick={handleUpdate}
              >
                Update
              </p>
              <p
                className="font-medium border border-orange-500 rounded-full px-4 py-1 bg-orange-500 text-white text-sm"
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        {renderingOn == "Home" ? (
          <div></div>
        ) : (
          <div
            className="w-[30%] overflow-hidden p-2 sm:block hidden"
            onClick={handleClick}
          >
            <img
              src={banner}
              className="rounded-lg object-cover"
              alt={title}
              loading="lazy"
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogCard;
