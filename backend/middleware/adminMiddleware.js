import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//middleware
dotenv.config();
//middleware
function verifyHeader(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "NO_TOKEN_FOUND",
    });
  }

  const token = authHeader.slice(7);

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
  }
}

export default verifyHeader;
