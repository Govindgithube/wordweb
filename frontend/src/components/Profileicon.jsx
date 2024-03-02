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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profileicon = () => {
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear("access_token");
    location.reload();
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <Link to="/profile">
        {console.log(userAvatar)}
        <img
          src={userAvatar}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full cursor-pointer"
          alt="profile_icon"
        />
      </Link>
      <button
        onClick={handleLogout}
        className="border-none px-4 text-sm sm:text-base sm:px-10 py-2 whitespace-nowrap rounded-md bg-gray-500 text-white font-medium"
      >
        Log out
      </button>
    </div>
  );
};

export default Profileicon;
