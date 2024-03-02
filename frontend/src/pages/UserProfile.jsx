import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import demoUser from "../assets/images/avatars/1.png";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance.js";
import BlogCard from "../components/BlogCard";

import { UserContext } from "../context/UserContextProvider";

const UserProfile = () => {
  const { userid } = useParams();
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);

  const [userFollowers, setUserFollowers] = useState([]);
  const [isLoggedUserFollows, setIsLoggedUserFollows] = useState("no");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/user/${userid}`);
        setUserProfile(data.user);
        setUserBlogs(data.user.blogs);
        setUserFollowers(data.user.followers);
      } catch (err) {
        toast.error(err.message);
        if (err.response.data.success == false) {
          toast.error(`${err.response.data.message}`);
        }
      }
    };

    const fetchLoggedInUserDetails = async () => {
      const token = user;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosInstance.post("/api/v1/user", {}, config);
        setLoggedUser(data.user);
      } catch (err) {
        toast.error(err.message);
        if (err.response.data.success == false) {
          toast.error(`${err.response.data.message}`);
        }
      }
    };

    fetchUserDetails();
    if (user) {
      fetchLoggedInUserDetails();
    }
  }, [userid, user, isLoggedUserFollows]);

  useEffect(() => {
    // check weither user follows the user or not
    const isFollows = () => {
      const isLoggesUserFollows = userFollowers.find(
        (id) => id === loggedUser._id
      );

      if (isLoggesUserFollows) {
        setIsLoggedUserFollows("yes");
      } else {
        setIsLoggedUserFollows("no");
      }
    };

    isFollows();
  }, [userFollowers, loggedUser._id]);

  const handleFollow = async () => {
    const token = user;
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/user/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsLoggedUserFollows("yes");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUnfollow = async () => {
    const wantedToUnfollow = confirm("Are you sure, you want to unfollow");

    if (wantedToUnfollow) {
      try {
        const { data } = await axiosInstance.delete(`/api/v1/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        if (data.success) {
          toast.success(data.message);
          setIsLoggedUserFollows("no");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <Toaster />
      <section className="h-auto">
        <div className="flex flex-col md:flex-row gap-14">
          <div className="w-[100%] md:w-[30%] flex flex-col items-center justify-start mt-5">
            <div>
              <img
                src={demoUser}
                className="aspect-square h-[400px] w-[400px] md:h-[200px] md:w-[200px] lg:h-[350px] lg:w-[350px]"
                alt="user_image"
              />
            </div>
            <p className="text-4xl font-bold mt-10">
              {userProfile.fullname && userProfile.fullname}
            </p>
            <p className="text-xl font-medium mt-4">
              {userProfile.email && userProfile.email}
            </p>
          </div>

          <div className="w-[100%] md:w=[70$]">
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

            {loggedUser && loggedUser._id != userProfile._id ? (
              <div>
                {isLoggedUserFollows && isLoggedUserFollows === "yes" ? (
                  <p
                    className="w-full text-lg rounded-full border-2 py-2 text-center my-6 cursor-pointer"
                    onClick={handleUnfollow}
                  >
                    Following
                  </p>
                ) : (
                  <p
                    className="w-full text-lg rounded-full text-white py-2 bg-blue-500 text-center my-6 cursor-pointer"
                    onClick={handleFollow}
                  >
                    Follow
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}

            <div className="h-[100%] overflow-y-scroll no-scrollbar mt-10">
              <p className="font-semibold text-lg p-2">
                {userProfile.fullname}&apos;s Posts
              </p>
              {userBlogs.length != 0 ? (
                userBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    post={blog}
                    renderingOn="myprofile"
                    author={userProfile.fullname}
                    authorId={userProfile._id}
                    authorEmail={userProfile.email}
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

export default UserProfile;
