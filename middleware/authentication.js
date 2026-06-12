const { verifiedToken } = require("../helper/jwt");
const { User } = require("../models/index");

const Authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    console.log(authorization);
    console.log("authorization");

    if (!authorization) {
      throw { name: "Unauthorized" };
    }
    console.log(authorization);
    console.log("authorization1");

    const access_token = authorization.split(" ")[1];

    const payload = verifiedToken(access_token);

    const userVerfied = await User.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!userVerfied) {
      throw { name: "Unauthorized" };
    }

    req.loginInfo = {
      UserId: userVerfied.id,
      username: userVerfied.username,
    };

    console.log(req.loginInfo);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
