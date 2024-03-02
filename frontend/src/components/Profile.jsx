import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContextProvider";
import BlogCard from "./BlogCard";
import axiosInstance from "../axiosInstance.js";
import { Navigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import avatar1 from "../assets/images/avatars/1.png";
import avatar2 from "../assets/images/avatars/2.png";
import avatar3 from "../assets/images/avatars/3.png";
import avatar4 from "../assets/images/avatars/4.png";
import avatar5 from "../assets/images/avatars/5.png";
import avatar6 from "../assets/images/avatars/6.png";
import avatar7 from "../assets/images/avatars/7.png";
import avatar8 from "../assets/images/avatars/8.png";
import avatar9 from "../assets/images/avatars/9.png";
import avatar10 from "../assets/images/avatars/10.png";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);
  const [userAvatar, setUserAvatar] = useState(avatar1);
  useEffect(() => {
    const profileIconArrays = [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
      avatar6,
      avatar7,
      avatar8,
      avatar9,
      avatar10,
    ];
    const randomAvatar = Math.floor(Math.random() * 11);
    setUserAvatar(profileIconArrays[randomAvatar]);
  }, [userAvatar]);

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
        setUserProfile(data.user);
        setUserBlogs(data.user.blogs.reverse());
      } catch (err) {
        toast.error(err.message);
        if (err.response.data.success == false) {
          toast.error(`${err.response.data.message}`);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      {user === null && <Navigate to="/signup" />}
      <Toaster />
      <section className="h-auto">
        <div className="flex flex-col md:flex-row gap-14">
          <div className="w-[100%] md:w-[30%] flex flex-col items-center justify-start mt-5">
            <div>
              <img
                src={userAvatar}
                className="aspect-square h-[400px] w-[400px] md:h-[200px] md:w-[200px] lg:h-[350px] lg:w-[350px] object-cover"
                alt="profile_icon"
              />
            </div>
            <p className="text-4xl font-bold mt-10">
              {userProfile.fullname && userProfile.fullname}
            </p>
            <p className="text-xl font-medium mt-4">
              {userProfile.email && userProfile.email}
            </p>
          </div>

          <div className="w-[100%] md:w-[70%]">
            <nav className="p-4 border-b">
              <p className="text-lg font-medium cursor-pointer underline underline-offset-8">
                Profile
              </p>
            </nav>

            <div className="flex justify-evenly mt-4">
              <div className="profile_counts">
                <p className="font-bold">{userBlogs.length}</p>
                <p className="text-sm">Posts</p>
              </div>
              <div className="profile_counts">
                <p className="font-bold">
                  {userProfile.followers && userProfile.followers.length}
                </p>
                <p className="text-sm">Followers</p>
              </div>
              <div className="profile_counts">
                <p className="font-bold">
                  {userProfile.following && userProfile.following.length}
                </p>
                <p className="text-sm">Following</p>
              </div>
            </div>

            <div className="h-[100%] overflow-y-scroll no-scrollbar mt-10">
              <p className="font-semibold text-lg p-2">Your Posts</p>
              {userBlogs.length != 0 ? (
                userBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    post={blog}
                    renderingOn="myprofile"
                    author={userProfile.fullname}
                    authorId={userProfile._id}
                  />
                ))
              ) : (
                <p className="p-2">Your Haven&apos;t Post Anything Yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
