const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const { signToken } = require("../helper/jwt");

class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw {
          name: "BadRequest",
          message: "Username dan password wajib diisi",
        };
      }

      const user = await User.findOne({
        where: {
          userName: username,
        },
      });

      if (!user) {
        throw {
          name: "Unauthorized",
          message: "Username atau password salah",
        };
      }

      if (user.password !== password) {
        throw {
          name: "Unauthorized",
          message: "Username atau password salah",
        };
      }
      const access_token = signToken({
        id: user.id,
        username: user.userName,
        email: user.email,
      });

      //   const access_token = jwt.sign(
      //     {
      //       id: user.id,
      //       username: user.userName,
      //       email: user.email,
      //     },
      //     process.env.JWT_SECRET || "secret",
      //   );

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
