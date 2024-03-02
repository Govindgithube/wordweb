import React, { Suspense } from "react";

import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance.js";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContextProvider";

import Tags from "../components/Tags";
import toast, { Toaster } from "react-hot-toast";

const Feed = React.lazy(() => import("../components/Feed"));

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useContext(UserContext);

  const [searchText, setSearchText] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const { data } = await axiosInstance.get("/api/v1/blog/all");
        setBlogs(data.blogs.reverse());
      } catch (err) {
        toast.error(err.message);
        if (err.response.data.success == false) {
          toast.error(`${err.response.data.message}`);
        }
      }
    };

    fetchAllPost();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = user;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosInstance.post("/api/v1/user", {}, config);
        setUserPosts(data.user.blogs);
      } catch (err) {
        toast.error(err.message);
        if (err.response.data.success == false) {
          toast.error(`${err.response.data.message}`);
        }
      }
    };
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const filterBlogs = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // i flag means case-insensetive

    return blogs.filter(
      (blog) =>
        regex.test(blog.author.fullname) ||
        regex.test(blog.tag) ||
        regex.test(blog.description) ||
        regex.test(blog.content) ||
        regex.test(blog.title)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const searchedResults = filterBlogs(e.target.value);
    setSearchResults(searchedResults);
  };

  const handleTagClick = (e) => {
    const tag = e.target.innerHTML;
    setSearchText(tag);

    const searchedResults = filterBlogs(tag);
    setSearchResults(searchedResults);
  };

  const handleCutButton = () => {
    setSearchText("");
  };

  return (
    <>
      <Toaster />
      <section className="">
        <div className="flex md:flex-row flex-col-reverse gap-4">
          <div className="w-full md:w-[70%] h-[87vh]">
            <p className="text-3xl font-bold font-montserrat ml-4">
              Latest Posts
            </p>
            <Suspense fallback={<p>Loading...</p>}>
              <Feed
                blogs={blogs}
                searchText={searchText}
                setSearchText={setSearchText}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                handleSearchChange={handleSearchChange}
                handleCutButton={handleCutButton}
              />
            </Suspense>
          </div>

          <hr />

          <div className="w-full md:w-[30%]">
            <div className="flex flex-wrap justify-start gap-2 px-4 py-6">
              {Tags &&
                Tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-full px-4 py-2 text-black cursor-pointer"
                    onClick={handleTagClick}
                  >
                    {tag}
                  </div>
                ))}
            </div>

            <p className="text-2xl font-semibold p-4 font-montserrat">
              {" "}
              Your Posts
            </p>
            <div className="md:h-[55vh] overflow-y-scroll no-scrollbar">
              {userPosts.length != 0 && user ? (
                userPosts.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    post={blog}
                    author={blog.author.fullname}
                    renderingOn="Home"
                  />
                ))
              ) : (
                <p className="p-4">
                  You Haven&apos;t Post Anything Yet{" "}
                  <Link to="/editor" className="text-blue-500 font-semibold">
                    Write Now
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
