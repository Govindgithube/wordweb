import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(400).json({
      success: false,
      message: "Please provide token",
    });
  }
  const tokenValue = token.split(" ")[1];

  try {
    const user = jwt.verify(tokenValue, process.env.JWT_TOKEN);
    req.userid = user.id;
    next();
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });
    }
    console.log("Error while verifying the token");
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to verify user, Internal server error",
    });
  }
};

export default verifyToken;
