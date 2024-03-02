import User from "../model/user.js";

const getUserDetails = async (req, res) => {
  const userid = req.userid;
  if (!userid) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }
  try {
    const response = await User.findById(userid).populate("blogs");
    // .populate("followers")
    // .populate("following");
    if (response) {
      return res.status(200).json({
        success: true,
        user: response,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log("Error while fetching user details");
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch user details, Internal server error",
    });
  }
};
const getSingleUserDetail = async (req, res) => {
  const userid = req.params.id;

  if (!userid) {
    return res.status(400).json({
      success: false,
      message: "User id not provided",
    });
  }

  try {
    const response = await User.findById(userid).populate("blogs");
    // .populate("followers")
    // .populate("following");
    if (response) {
      res.status(200).json({
        success: true,
        user: response,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log("Error while fetching single user details");
    console.log(err);
  }
};
const followUser = async (req, res) => {
  // user_id = person whom to follow or the person who will be followed
  // currUser_id = person who is following the other one
  const user_id = req.params.user_id;
  const currUser_id = req.userid;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Prover user id",
    });
  }

  try {
    // fetch details of person to be followed
    const userDetails = await User.findById(user_id);
    const followersArray = userDetails.followers;
    const isAlreadyFollows = followersArray.find((id) => id == currUser_id);

    if (isAlreadyFollows) {
      return res.status(400).json({
        success: false,
        message: "You already follow this user",
      });
    }

    const userToFollow = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          followers: currUser_id,
        },
      },
      { new: true }
    );

    const userFollowing = await User.findByIdAndUpdate(
      currUser_id,
      {
        $push: {
          following: user_id,
        },
      },
      { new: true }
    );

    if (userToFollow && userFollowing) {
      return res.status(200).json({
        success: true,
        message: "User followed successfully",
      });
    }
  } catch (err) {
    console.log("Error while following the user");
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to follow the user, Internal server error",
    });
  }
};
const unfollowUser = async (req, res) => {
  // user_id = person to be unfollowed
  // currUser_id = person is trying to unfollow
  const user_id = req.params.user_id;
  const currUser_id = req.userid;
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Provide user id",
    });
  }

  try {
    // person to be unfollowed
    const personUnfollowed = await User.findByIdAndUpdate(user_id, {
      $pull: {
        followers: currUser_id,
      },
    });

    // update curr user following list
    const currUser = await User.findByIdAndUpdate(currUser_id, {
      $pull: {
        following: user_id,
      },
    });

    if (personUnfollowed && currUser) {
      return res.status(200).json({
        success: true,
        message: "Unfollowed Successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Unable to unfollow the user",
      });
    }
  } catch (err) {
    console.log("Error while unfollowing the user");
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to unfollow user, Internal server error",
    });
  }
};

export { getUserDetails, getSingleUserDetail, followUser, unfollowUser };
