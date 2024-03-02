import jwt from "jsonwebtoken";

const generateToken = (userid) => {
  const token = jwt.sign({ id: userid }, process.env.JWT_TOKEN, {
    expiresIn: "2d",
  });
  return token;
};

export default generateToken;
