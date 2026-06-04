const jwt = require("jsonwebtoken");
const secretKey = "rahasia";

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verifiedToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { signToken, verifiedToken };
