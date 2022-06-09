const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};
module.exports = checkAuth;
