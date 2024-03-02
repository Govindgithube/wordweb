import User from "../model/user.js";
import bcrypt from "bcrypt";

import generateToken from "../service/generateToken.js";

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  // console.log(fullname, email, password);

  // check weither any of the above field is not empty
  if (!fullname || !email || !password) {
    res.status(404).json({
      success: false,
      message: "Please provide all the details",
    });
    return;
  }

  // check is user already exists or not ?
  const isUserExists = await User.find({ email: email });
  // console.log(isUserExists);
  if (isUserExists.length > 0) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  try {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("error while hashing password: ", err);
        res.status(500).json({
          success: false,
          message: "Unable to signup user, internal server error",
        });
      } else {
        const newUser = new User({
          fullname: fullname,
          email: email,
          password: hash,
        });

        await newUser.save();
        res.status(201).json({
          success: true,
          message: "User signed up successfully",
          user: newUser,
          token: generateToken(newUser._id),
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to sign up user. internal server error",
    });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;

  // check weither any of the field is empty
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }
  // check if userexists or registered or not
  try {
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists == null) {
      return res.status(404).json({
        success: false,
        message: "No user found with provided email",
      });
    } else {
      bcrypt.compare(password, isUserExists.password, (err, result) => {
        if (err) {
          console.log("error while hashing password (login): ", err);
          res
            .status(500)
            .json({ success: false, message: "Unable to login user" });
        }

        if (result) {
          res.status(201).json({
            success: true,
            message: "Login successfull",
            user: isUserExists,
            token: generateToken(isUserExists._id),
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Unauthorized acess, Wrong credentials",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to login, Internal server error",
    });
  }
};

export { signup, signin };
