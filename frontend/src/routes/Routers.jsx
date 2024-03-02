import { Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import Editor from "../pages/Editor";
// import Signup from "../components/Signup";
// import Signin from "../components/Signin";
// import Profile from "../components/Profile";
// import Blog from "../pages/Blog";
// import UpdateBlog from "../pages/UpdateBlog";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("../pages/Home"));
const Editor = React.lazy(() => import("../pages/Editor"));
const Signup = React.lazy(() => import("../components/Signup"));
const Signin = React.lazy(() => import("../components/Signin"));
const Profile = React.lazy(() => import("../components/Profile"));
const Blog = React.lazy(() => import("../pages/Blog"));
const UpdateBlog = React.lazy(() => import("../pages/UpdateBlog"));
const UserProfile = React.lazy(() => import("../pages/UserProfile"));

const Routers = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:blogid" element={<Blog />} />
        <Route path="/update-blog/:blogid" element={<UpdateBlog />} />
        <Route path="/user-profile/:userid" element={<UserProfile />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
